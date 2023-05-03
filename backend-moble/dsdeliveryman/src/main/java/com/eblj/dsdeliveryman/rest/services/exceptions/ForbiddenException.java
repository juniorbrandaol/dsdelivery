package com.eblj.dsdeliveryman.rest.services.exceptions;

public class ForbiddenException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	public ForbiddenException(String msg) {
		super(msg);
	}
}
