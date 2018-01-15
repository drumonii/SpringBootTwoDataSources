package demo.model.secondary.builder;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;

public final class SecondaryModelBuilder {

	private String name;

	public SecondaryModelBuilder withName(String name) {
		this.name = name;
		return this;
	}

	public SecondaryModelBuilder fromForm(SecondaryForm form) {
		withName(form.getName());
		return this;
	}

	public SecondaryModel build() {
		SecondaryModel secondaryModel = new SecondaryModel();
		secondaryModel.setName(name);
		return secondaryModel;
	}

}
