package demo.model.primary.builder;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PrimaryModelBuilderTest {

	@Test
	void buildsPrimaryModel() {
		PrimaryModel primaryModel = new PrimaryModelBuilder()
				.withName("Test")
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

	@Test
	void buildsPrimaryModelFromPrimaryForm() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		PrimaryModel primaryModel = new PrimaryModelBuilder()
				.fromForm(form)
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

}
