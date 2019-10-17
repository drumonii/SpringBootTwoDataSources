package demo.constraint;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.repository.secondary.SecondaryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;

class UniqueSecondaryTest extends AbstractConstraintValidatorTest {

	@MockBean
	private SecondaryRepository secondaryRepository;

	@Test
	void uniqueSecondaryModel() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		given(secondaryRepository.findByNameIgnoreCase(eq(form.getName()))).willReturn(null);

		Set<ConstraintViolation<SecondaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).isEmpty();
	}

	@Test
	void nonUniqueSecondaryModel() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		given(secondaryRepository.findByNameIgnoreCase(eq(form.getName()))).willReturn(new SecondaryModel());

		Set<ConstraintViolation<SecondaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).hasSize(1);
	}

}
