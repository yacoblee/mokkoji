package com.example.mokkoji_backend.exception;

import java.util.HashMap;
import java.util.Map;

//@Getter
public class ErrorResponse {

    private int code;

    private String message;

    private final Map<String, String> validationMap = new HashMap<>();


    //@Builder


    public ErrorResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public void addValidation(String field, String errorMessage) {
        this.validationMap.put(field, errorMessage);
    }
}
