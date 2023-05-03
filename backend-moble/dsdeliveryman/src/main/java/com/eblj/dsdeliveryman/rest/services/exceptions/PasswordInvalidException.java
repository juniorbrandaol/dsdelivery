package com.eblj.dsdeliveryman.rest.services.exceptions;

public class PasswordInvalidException extends RuntimeException {
    public PasswordInvalidException(){
        super("Senha ou e-mail inválido.");
    }
}
