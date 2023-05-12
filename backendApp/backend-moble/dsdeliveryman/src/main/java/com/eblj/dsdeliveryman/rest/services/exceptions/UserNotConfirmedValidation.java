package com.eblj.dsdeliveryman.rest.services.exceptions;

public class UserNotConfirmedValidation extends RuntimeException {
    public UserNotConfirmedValidation(){
        super("Usuário ainda não confirmou cadastro.");
    }
}