package com.eblju.dsdelivery.rest.services.exceptions;

public class TokenInvalidException extends RuntimeException {
    public TokenInvalidException(String msg)
    {  super(msg);
    }
}
