package com.eblj.dsdeliveryman.enuns;

public enum Status {

    WAITING(0),
    ACCEPTED(1),
    CANCELED(2),
    DELIVERED(3);

    private int code;

    private Status(int code) {
        this.code= code;
    }

    public int getCode() {;
        return code;
    }

    public static Status valueOf(int code) {
        for(Status value: Status.values()) {
            if(value.code==code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid order status code");
    }
}
