package demo.controller.secondary;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class SecondaryControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getSeconday() throws Exception {
		mockMvc.perform(get("/secondary"))
				.andExpect(status().isOk())
				.andExpect(view().name("secondary"));
	}

}
