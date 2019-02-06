package demo.rest.validation.builder;

import demo.rest.validation.ValidationError;
import demo.rest.validation.ValidationResponse;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

public class ValidationResponseWithErrorsBuilder<T>  {

    private static final Locale LOCALE = LocaleContextHolder.getLocale();

    private Map<String, ValidationError> errors = new LinkedHashMap<>();
    private MessageSource messageSource;

    public ValidationResponseWithErrorsBuilder(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public ValidationResponseWithErrorsBuilder<T> fromBindingResult(BindingResult result) {
        for (FieldError fieldError : result.getFieldErrors()) {
            String message;

            String[] codes = fieldError.getCodes();
            if (codes != null && codes.length > 0) {
                String code = fieldError.getCodes()[0];
                message = messageSource.getMessage(code, fieldError.getArguments(), fieldError.getDefaultMessage(), LOCALE);
            } else {
                message = fieldError.getDefaultMessage();
            }

            ValidationError error = new ValidationErrorBuilder()
                    .withMessage(message)
                    .build();
            errors.put(fieldError.getField(), error);
        }
        return this;
    }

    public ValidationResponse<T> build() {
        ValidationResponse<T> response = new ValidationResponse<>();
        response.setErrors(errors);
        return response;
    }

}
