package demo.controller.primary;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class PrimaryRestControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getPrimaryFromRepository() throws Exception {
		mockMvc.perform(get("/primary/repo"))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"));
	}
	
	@Test
	public void getPrimaryFromService() throws Exception {
		mockMvc.perform(get("/primary/service"))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"));
	}

}
