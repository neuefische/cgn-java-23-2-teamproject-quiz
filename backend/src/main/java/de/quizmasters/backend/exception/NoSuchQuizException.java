package de.quizmasters.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Quiz not found!")

public class NoSuchQuizException extends RuntimeException {

    public NoSuchQuizException(String message) {
        super(message);
    }
}
