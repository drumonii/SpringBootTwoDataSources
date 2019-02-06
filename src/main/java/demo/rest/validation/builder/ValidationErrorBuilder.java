package demo.rest.validation.builder;

import demo.rest.validation.ValidationError;

public final class ValidationErrorBuilder {

    private String message;

    public ValidationErrorBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    public ValidationError build() {
        ValidationError validationError = new ValidationError();
        validationError.setMessage(message);
        return validationError;
    }

}
