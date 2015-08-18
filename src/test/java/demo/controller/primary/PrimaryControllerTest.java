package demo.controller.primary;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Test;

import demo.BaseSpringTestRunner;

public class PrimaryControllerTest extends BaseSpringTestRunner {
	
	@Test
	public void getPrimary() throws Exception {
		mockMvc.perform(get("/primary"))
				.andExpect(status().isOk())
				.andExpect(view().name("primary"));
	}

}
