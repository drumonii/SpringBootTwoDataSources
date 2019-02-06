package demo.rest.validation;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ValidationError {

    @JsonProperty
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
