package com.eblju.dsdelivery.rest.services.exceptions;

public class TokenInvalidException extends RuntimeException {
    public TokenInvalidException()
    {  super("Token inválido");
    }
}
