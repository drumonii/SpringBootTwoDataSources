package demo.rest.secondary;

import com.fasterxml.jackson.databind.ObjectMapper;
import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.model.secondary.builder.SecondaryModelBuilder;
import demo.repository.secondary.SecondaryRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SecondaryRestControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

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
				.andExpect(status().isBadRequest());
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
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonPath("$.name", is(form.getName())));

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
				.andExpect(status().isBadRequest());
	}

}