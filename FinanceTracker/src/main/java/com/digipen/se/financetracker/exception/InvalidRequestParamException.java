package com.digipen.se.financetracker.exception;

import java.io.Serial;

public class InvalidRequestParamException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public InvalidRequestParamException(String message){
        super(message);
    }
}
