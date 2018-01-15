package demo.model.primary.builder;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PrimaryModelBuilderTest {

	@Test
	public void buildsPrimaryModel() {
		PrimaryModel primaryModel = new PrimaryModelBuilder()
				.withName("Test")
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

	@Test
	public void buildsPrimaryModelFromPrimaryForm() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		PrimaryModel primaryModel = new PrimaryModelBuilder()
				.fromForm(form)
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

}