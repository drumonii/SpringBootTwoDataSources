package demo.constraint;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;

class UniquePrimaryTest extends AbstractConstraintValidatorTest {

	@MockBean
	private PrimaryRepository primaryRepository;

	@Test
	void uniquePrimaryModel() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		given(primaryRepository.findByNameIgnoreCase(eq(form.getName()))).willReturn(null);

		Set<ConstraintViolation<PrimaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).isEmpty();
	}

	@Test
	void nonUniquePrimaryModel() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		given(primaryRepository.findByNameIgnoreCase(eq(form.getName()))).willReturn(new PrimaryModel());

		Set<ConstraintViolation<PrimaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).hasSize(1);
	}

}
