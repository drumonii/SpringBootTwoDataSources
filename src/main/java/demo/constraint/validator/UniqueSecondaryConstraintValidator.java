package demo.constraint.validator;

import demo.constraint.UniqueSecondary;
import demo.repository.secondary.SecondaryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueSecondaryConstraintValidator implements ConstraintValidator<UniqueSecondary, String> {

	@Autowired
	private SecondaryRepository secondaryRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return secondaryRepository.findByNameIgnoreCase(value) == null;
	}

}
