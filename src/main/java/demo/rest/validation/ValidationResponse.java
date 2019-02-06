package demo.rest.validation;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

@JsonInclude(Include.NON_NULL)
public class ValidationResponse<T> {

    @JsonProperty
    private Map<String, ValidationError> errors;

    @JsonProperty
    private T data;

    public Map<String, ValidationError> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, ValidationError> errors) {
        this.errors = errors;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
