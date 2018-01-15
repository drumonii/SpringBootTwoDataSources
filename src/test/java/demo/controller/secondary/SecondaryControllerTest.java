package demo.controller.secondary;

import demo.model.secondary.SecondaryModel;
import demo.model.secondary.builder.SecondaryModelBuilder;
import demo.repository.secondary.SecondaryRepository;
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
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(SecondaryController.class)
public class SecondaryControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private SecondaryRepository secondaryRepository;
	
	@Test
	public void getSeconday() throws Exception {
		mockMvc.perform(get("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("secondaryForm"))
				.andExpect(model().attribute("activeTab", is("secondary")))
				.andExpect(view().name("secondary"));
	}

	@Test
	public void saveSecondaryWithFormErrors() throws Exception {
		mockMvc.perform(post("/secondary"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasFieldErrors("secondaryForm", "name"))
				.andExpect(model().attribute("activeTab", is("secondary")))
				.andExpect(view().name("secondary"));
	}

	@Test
	public void saveSecondary() throws Exception {
		when(secondaryRepository.findByNameIgnoreCase(eq("Test"))).thenReturn(null);
		when(secondaryRepository.save(any(SecondaryModel.class))).thenReturn(new SecondaryModelBuilder()
				.withName("Test")
				.build());

		mockMvc.perform(post("/secondary").param("name", "Test"))
				.andExpect(status().is3xxRedirection())
				.andExpect(flash().attributeExists("success"))
				.andExpect(redirectedUrl("/secondary"));

		ArgumentCaptor<SecondaryModel> secondaryModelArgumentCaptor = ArgumentCaptor.forClass(SecondaryModel.class);
		verify(secondaryRepository, times(1)).save(secondaryModelArgumentCaptor.capture());
		assertThat(secondaryModelArgumentCaptor.getValue().getName()).isEqualTo("Test");
	}

	@Test
	public void saveSecondaryWithExisting() throws Exception {
		when(secondaryRepository.findByNameIgnoreCase(eq("Test"))).thenReturn(new SecondaryModel());

		mockMvc.perform(post("/secondary").param("name", "Test"))
				.andExpect(status().isOk())
				.andExpect(model().attributeHasErrors("secondaryForm"))
				.andExpect(model().attribute("activeTab", is("secondary")))
				.andExpect(view().name("secondary"));
	}

}
