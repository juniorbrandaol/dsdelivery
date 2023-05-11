package com.eblju.dsdelivery.enuns;

public enum OrderStatus {
    PENDING(0)  ,
    ACCEPTED(1),
    REJECTED(2),
    DISPATCHED(3),
    DELIVERED(4);
    private int code;

    private OrderStatus(int code) {
        this.code= code;
    }

    public int getCode() {;
        return code;
    }

    public static OrderStatus valueOf(int code) {
        for(OrderStatus value: OrderStatus.values()) {
            if(value.code==code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid order status code");
    }
}
