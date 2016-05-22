package demo.controller.primary;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class PrimaryControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getPrimary() throws Exception {
		mockMvc.perform(get("/primary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("primaryModel"))
				.andExpect(model().attribute("activeTab", is("primary")))
				.andExpect(view().name("primary"));
	}
	
	@Test
	public void savePrimary() throws Exception {
		mockMvc.perform(post("/primary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasErrors("primaryModel"))
				.andExpect(model().attributeHasFieldErrors("primaryModel", "name"))
				.andExpect(model().attribute("activeTab", is("primary")))
				.andExpect(view().name("primary"));
		mockMvc.perform(post("/primary").param("name", "Test"))
				.andExpect(status().is3xxRedirection())
				.andExpect(redirectedUrl("/primary"));
	}

}
