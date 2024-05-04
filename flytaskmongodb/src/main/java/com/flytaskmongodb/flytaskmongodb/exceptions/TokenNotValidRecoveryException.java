package com.flytaskmongodb.flytaskmongodb.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class TokenNotValidRecoveryException extends RuntimeException {
    public TokenNotValidRecoveryException(String message) {
        super(message);
    }

}
