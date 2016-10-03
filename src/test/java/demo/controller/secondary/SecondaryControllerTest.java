package demo.controller.secondary;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class SecondaryControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getSeconday() throws Exception {
		mockMvc.perform(get("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("secondaryModel"))
				.andExpect(model().attribute("activeTab", is("secondary")))
				.andExpect(view().name("secondary"));
	}
	
	@Test
	public void saveSecondary() throws Exception {
		mockMvc.perform(post("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasErrors("secondaryModel"))
				.andExpect(model().attributeHasFieldErrors("secondaryModel", "name"))
				.andExpect(model().attribute("activeTab", is("secondary")))
				.andExpect(view().name("secondary"));
		mockMvc.perform(post("/secondary").param("name", "Test"))
				.andExpect(status().is3xxRedirection())
				.andExpect(flash().attribute("success", is("Test")))
				.andExpect(redirectedUrl("/secondary"));
	}

}
