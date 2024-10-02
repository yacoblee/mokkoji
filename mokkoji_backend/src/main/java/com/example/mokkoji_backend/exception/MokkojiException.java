package com.example.mokkoji_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class MokkojiException extends RuntimeException {

    private final HttpStatus httpStatus;

    public MokkojiException(String message, Throwable cause) {
        super(message, cause);
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public MokkojiException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }

    public MokkojiException(String message) {
        super(message);
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public MokkojiException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
