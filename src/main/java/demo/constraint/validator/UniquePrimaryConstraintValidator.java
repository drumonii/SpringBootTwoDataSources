package demo.constraint.validator;

import demo.constraint.UniquePrimary;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniquePrimaryConstraintValidator implements ConstraintValidator<UniquePrimary, String> {

	@Autowired
	private PrimaryRepository primaryRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return primaryRepository.findByNameIgnoreCase(value) == null;
	}

}
