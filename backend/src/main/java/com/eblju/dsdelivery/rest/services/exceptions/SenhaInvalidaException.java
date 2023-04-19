package com.eblju.dsdelivery.rest.services.exceptions;

public class SenhaInvalidaException extends RuntimeException {
    public SenhaInvalidaException(){
        super("Senha inválida.");
    }
}
