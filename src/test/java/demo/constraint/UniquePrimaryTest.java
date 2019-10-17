package demo.constraint;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.hibernate.validator.HibernateValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UniquePrimaryTest {

	private LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();

	@Mock
	private PrimaryRepository primaryRepository;

	@BeforeEach
	void before() {
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.refresh();

		ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
		beanFactory.registerSingleton(PrimaryRepository.class.getCanonicalName(), primaryRepository);

		validator.setApplicationContext(context);
		validator.setProviderClass(HibernateValidator.class);
		validator.afterPropertiesSet();
	}

	@Test
	void uniquePrimaryModel() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		when(primaryRepository.findByNameIgnoreCase(eq(form.getName()))).thenReturn(null);

		Set<ConstraintViolation<PrimaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).isEmpty();
	}

	@Test
	void nonUniquePrimaryModel() {
		PrimaryForm form = new PrimaryForm();
		form.setName("Test");

		when(primaryRepository.findByNameIgnoreCase(eq(form.getName()))).thenReturn(new PrimaryModel());

		Set<ConstraintViolation<PrimaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).hasSize(1);
	}

}
