package demo.constraint.validator;

import demo.constraint.UniquePrimary;
import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniquePrimaryConstraintValidator implements ConstraintValidator<UniquePrimary, String> {

	@Autowired
	private PrimaryRepository primaryRepository;

	@Override
	public void initialize(UniquePrimary constraintAnnotation) {
		// Nothing to do in initialize
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null) {
			return false;
		}
		return primaryRepository.findByNameIgnoreCase(value) == null;
	}

}
