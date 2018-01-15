package demo.model.secondary.builder;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class SecondaryModelBuilderTest {

	@Test
	public void buildsSecondaryModel() {
		SecondaryModel secondaryModel = new SecondaryModelBuilder()
				.withName("Test")
				.build();

		assertThat(secondaryModel.getName()).isEqualTo("Test");
	}

	@Test
	public void buildsSecondaryModelFromSecondaryForm() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		SecondaryModel primaryModel = new SecondaryModelBuilder()
				.fromForm(form)
				.build();

		assertThat(primaryModel.getName()).isEqualTo("Test");
	}

}