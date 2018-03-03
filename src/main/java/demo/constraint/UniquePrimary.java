package demo.constraint;

import demo.constraint.validator.UniquePrimaryConstraintValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.NotEmpty;
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
