package demo.constraint;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.repository.secondary.SecondaryRepository;
import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UniqueSecondaryTest {

	private LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();

	@Mock
	private SecondaryRepository secondaryRepository;

	@Before
	public void before() {
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.refresh();

		ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
		beanFactory.registerSingleton(SecondaryRepository.class.getCanonicalName(), secondaryRepository);

		validator.setApplicationContext(context);
		validator.setProviderClass(HibernateValidator.class);
		validator.afterPropertiesSet();
	}

	@Test
	public void uniqueSecondaryModel() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		when(secondaryRepository.findByNameIgnoreCase(eq(form.getName()))).thenReturn(null);

		Set<ConstraintViolation<SecondaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).isEmpty();
	}

	@Test
	public void nonUniqueSecondaryModel() {
		SecondaryForm form = new SecondaryForm();
		form.setName("Test");

		when(secondaryRepository.findByNameIgnoreCase(eq(form.getName()))).thenReturn(new SecondaryModel());

		Set<ConstraintViolation<SecondaryForm>> constraintViolations = validator.validate(form);
		assertThat(constraintViolations).hasSize(1);
	}

}