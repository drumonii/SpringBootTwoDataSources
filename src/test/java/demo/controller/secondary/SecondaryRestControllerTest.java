package demo.controller.secondary;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class SecondaryRestControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getSecondaryFromRepository() throws Exception {
		mockMvc.perform(get("/secondary/repo"))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"));
	}
	
	@Test
	public void getSecondaryFromService() throws Exception {
		mockMvc.perform(get("/secondary/service"))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"));
	}

}
