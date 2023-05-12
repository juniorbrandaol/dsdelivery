package com.eblj.dsdeliveryman.enuns;

public enum VehicleType {
    MOTOCICLETA(0)  ,
    CARRO(1),
    BICICLETA(2);
    private int code;

    private VehicleType(int code) {
        this.code= code;
    }

    public int getCode() {;
        return code;
    }

    public static VehicleType valueOf(int code) {
        for(VehicleType value: VehicleType.values()) {
            if(value.code==code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid Vehicle type code");
    }

}
