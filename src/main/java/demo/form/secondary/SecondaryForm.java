package demo.form.secondary;

import demo.constraint.UniqueSecondary;

public class SecondaryForm {

	@UniqueSecondary
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
