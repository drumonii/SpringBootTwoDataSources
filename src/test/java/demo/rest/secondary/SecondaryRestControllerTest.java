package demo.rest.secondary;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.model.secondary.builder.SecondaryModelBuilder;
import demo.repository.secondary.SecondaryRepository;
import demo.rest.AbstractRestControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class SecondaryRestControllerTest extends AbstractRestControllerTest {

	@Autowired
	private SecondaryRepository secondaryRepository;

	@Test
	public void getSecondary() throws Exception {
		mockMvc.perform(get("/api/secondary"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.content").isArray())
				.andExpect(jsonPath("$.pageable").isMap());
	}

	@Test
	public void saveSecondaryWithFormErrors() throws Exception {
		SecondaryForm form = new SecondaryForm();

		mockMvc.perform(post("/api/secondary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("NotEmpty.secondaryForm.name", null, LOCALE))));
	}

	@Test
	public void saveSecondary() throws Exception {
		SecondaryForm form = new SecondaryForm();
		form.setName("Unique Name!");

		mockMvc.perform(post("/api/secondary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.data").exists())
				.andExpect(jsonPath("$.data.id").isNumber())
				.andExpect(jsonPath("$.data.name", is(form.getName())));

	}

	@Test
	public void saveSecondaryWithExisting() throws Exception {
		SecondaryModel secondaryModel = secondaryRepository.save(new SecondaryModelBuilder()
				.withName("Existing name!")
				.build());

		SecondaryForm form = new SecondaryForm();
		form.setName(secondaryModel.getName());

		mockMvc.perform(post("/api/secondary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("UniqueSecondary.secondaryForm.name", null, LOCALE))));
	}

}