package demo.constraint;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.boot.test.autoconfigure.OverrideAutoConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@ExtendWith(SpringExtension.class)
@OverrideAutoConfiguration(enabled = false)
@ImportAutoConfiguration({ ValidationAutoConfiguration.class })
public abstract class AbstractConstraintValidatorTest {

    @Autowired
    protected LocalValidatorFactoryBean validator;

}
