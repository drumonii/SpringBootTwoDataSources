package demo.controller.primary;

import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
import demo.repository.primary.PrimaryRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(PrimaryController.class)
public class PrimaryControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PrimaryRepository primaryRepository;
	
	@Test
	public void getPrimary() throws Exception {
		mockMvc.perform(get("/primary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("primaryForm"))
				.andExpect(model().attribute("activeTab", is("primary")))
				.andExpect(view().name("primary"));
	}
	
	@Test
	public void savePrimaryWithFormErrors() throws Exception {
		mockMvc.perform(post("/primary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasFieldErrors("primaryForm", "name"))
				.andExpect(model().attribute("activeTab", is("primary")))
				.andExpect(view().name("primary"));
	}

	@Test
	public void savePrimary() throws Exception {
		when(primaryRepository.findByNameIgnoreCase(eq("Test"))).thenReturn(null);
		when(primaryRepository.save(any(PrimaryModel.class))).thenReturn(new PrimaryModelBuilder()
				.withName("Test")
				.build());

		mockMvc.perform(post("/primary").param("name", "Test"))
				.andExpect(status().is3xxRedirection())
				.andExpect(flash().attributeExists("success"))
				.andExpect(redirectedUrl("/primary"));

		ArgumentCaptor<PrimaryModel> primaryModelArgumentCaptor = ArgumentCaptor.forClass(PrimaryModel.class);
		verify(primaryRepository, times(1)).save(primaryModelArgumentCaptor.capture());
		assertThat(primaryModelArgumentCaptor.getValue().getName()).isEqualTo("Test");
	}

	@Test
	public void savePrimaryWithExisting() throws Exception {
		when(primaryRepository.findByNameIgnoreCase(eq("Test"))).thenReturn(new PrimaryModel());

		mockMvc.perform(post("/primary").param("name", "Test"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasErrors("primaryForm"))
				.andExpect(model().attribute("activeTab", is("primary")))
				.andExpect(view().name("primary"));
	}

}
