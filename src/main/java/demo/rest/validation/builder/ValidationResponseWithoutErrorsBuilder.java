package demo.rest.validation.builder;

import demo.rest.validation.ValidationResponse;

public class ValidationResponseWithoutErrorsBuilder<T> {

    private T data;

    public ValidationResponseWithoutErrorsBuilder<T> withData(T data) {
        this.data = data;
        return this;
    }

    public ValidationResponse<T> build() {
        ValidationResponse<T> response = new ValidationResponse<>();
        response.setData(data);
        return response;
    }

}
