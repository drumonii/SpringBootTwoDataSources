package demo.model.secondary.builder;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SecondaryModelBuilderTest {

	@Test
	void buildsSecondaryModel() {
		SecondaryModel secondaryModel = new SecondaryModelBuilder()
				.withName("Test")
				.build();

		assertThat(secondaryModel.getName()).isEqualTo("Test");
	}

	@Test
	void buildsSecondaryModelFromSecondaryForm() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		SecondaryModel primaryModel = new SecondaryModelBuilder()
				.fromForm(form)
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

}
