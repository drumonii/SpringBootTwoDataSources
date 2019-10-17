package demo.rest.primary;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
import demo.repository.primary.PrimaryRepository;
import demo.rest.AbstractRestControllerTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class PrimaryRestControllerTest extends AbstractRestControllerTest {

	@Autowired
	private PrimaryRepository primaryRepository;

	@Test
	void getPrimary() throws Exception {
		mockMvc.perform(get("/api/primary"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.content").isArray())
				.andExpect(jsonPath("$.pageable").isMap());
	}

	@Test
	void savePrimaryWithFormErrors() throws Exception {
		PrimaryForm form = new PrimaryForm();

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("NotEmpty.primaryForm.name", null, LOCALE))));
	}

	@Test
	void savePrimary() throws Exception {
		PrimaryForm form = new PrimaryForm();
		form.setName("Unique Name!");

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.data").exists())
				.andExpect(jsonPath("$.data.id").isNumber())
				.andExpect(jsonPath("$.data.name", is(form.getName())));

	}

	@Test
	void savePrimaryWithExisting() throws Exception {
		PrimaryModel primaryModel = primaryRepository.save(new PrimaryModelBuilder()
				.withName("Existing name!")
				.build());

		PrimaryForm form = new PrimaryForm();
		form.setName(primaryModel.getName());

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("UniquePrimary.primaryForm.name", null, LOCALE))));
	}

}
