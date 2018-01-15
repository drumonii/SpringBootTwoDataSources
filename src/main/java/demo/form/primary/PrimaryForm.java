package demo.form.primary;

import demo.constraint.UniquePrimary;

public class PrimaryForm {

	@UniquePrimary
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
