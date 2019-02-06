package demo.rest.primary;

import com.fasterxml.jackson.databind.ObjectMapper;
import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
import demo.repository.primary.PrimaryRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Locale;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PrimaryRestControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MessageSource messageSource;

	private static final Locale LOCALE = LocaleContextHolder.getLocale();

	@Autowired
	private PrimaryRepository primaryRepository;

	@Test
	public void getPrimary() throws Exception {
		mockMvc.perform(get("/api/primary"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.content").isArray())
				.andExpect(jsonPath("$.pageable").isMap());
	}

	@Test
	public void savePrimaryWithFormErrors() throws Exception {
		PrimaryForm form = new PrimaryForm();

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("NotEmpty.primaryForm.name", null, LOCALE))));
	}

	@Test
	public void savePrimary() throws Exception {
		PrimaryForm form = new PrimaryForm();
		form.setName("Unique Name!");

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.data").exists())
				.andExpect(jsonPath("$.data.id").isNumber())
				.andExpect(jsonPath("$.data.name", is(form.getName())));

	}

	@Test
	public void savePrimaryWithExisting() throws Exception {
		PrimaryModel primaryModel = primaryRepository.save(new PrimaryModelBuilder()
				.withName("Existing name!")
				.build());

		PrimaryForm form = new PrimaryForm();
		form.setName(primaryModel.getName());

		mockMvc.perform(post("/api/primary")
				.content(objectMapper.writeValueAsString(form))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.errors").exists())
				.andExpect(jsonPath("$.errors.name").exists())
				.andExpect(jsonPath("$.errors.name.message",
						is(messageSource.getMessage("UniquePrimary.primaryForm.name", null, LOCALE))));
	}

}