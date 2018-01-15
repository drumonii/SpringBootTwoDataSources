package demo.constraint;

import demo.constraint.validator.UniquePrimaryConstraintValidator;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@NotEmpty
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniquePrimaryConstraintValidator.class)
@Documented
public @interface UniquePrimary {

	String message() default "Primary already exists";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
