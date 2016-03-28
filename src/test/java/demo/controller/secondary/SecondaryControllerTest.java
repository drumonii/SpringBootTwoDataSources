package demo.controller.secondary;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class SecondaryControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getSeconday() throws Exception {
		mockMvc.perform(get("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("secondaryModel"))
				.andExpect(view().name("secondary"));
	}
	
	@Test
	public void saveSecondary() throws Exception {
		mockMvc.perform(post("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasErrors("secondaryModel"))
				.andExpect(model().attributeHasFieldErrors("secondaryModel", "name"))
				.andExpect(view().name("secondary"));
		mockMvc.perform(post("/secondary").param("name", "Test"))
				.andExpect(status().is3xxRedirection())
				.andExpect(redirectedUrl("/secondary"));
	}

}
