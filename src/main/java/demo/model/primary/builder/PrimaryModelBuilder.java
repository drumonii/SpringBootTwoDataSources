package demo.model.primary.builder;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;

public final class PrimaryModelBuilder {

	private String name;

	public PrimaryModelBuilder withName(String name) {
		this.name = name;
		return this;
	}

	public PrimaryModelBuilder fromForm(PrimaryForm form) {
		withName(form.getName());
		return this;
	}

	public PrimaryModel build() {
		PrimaryModel primaryModel = new PrimaryModel();
		primaryModel.setName(name);
		return primaryModel;
	}

}
