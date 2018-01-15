package demo.constraint;

import demo.constraint.validator.UniqueSecondaryConstraintValidator;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@NotEmpty
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueSecondaryConstraintValidator.class)
@Documented
public @interface UniqueSecondary {

	String message() default "Secondary already exists";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
