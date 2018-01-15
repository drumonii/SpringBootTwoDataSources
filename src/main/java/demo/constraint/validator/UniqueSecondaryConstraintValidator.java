package demo.constraint.validator;

import demo.constraint.UniqueSecondary;
import demo.form.secondary.SecondaryForm;
import demo.repository.secondary.SecondaryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueSecondaryConstraintValidator implements ConstraintValidator<UniqueSecondary, String> {

	@Autowired
	private SecondaryRepository secondaryRepository;

	@Override
	public void initialize(UniqueSecondary constraintAnnotation) {
		// Nothing to do in initialize
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null) {
			return false;
		}
		return secondaryRepository.findByNameIgnoreCase(value) == null;
	}

}
