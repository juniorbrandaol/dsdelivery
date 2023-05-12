package com.eblj.dsdeliveryman.entities;

import com.eblj.dsdeliveryman.enuns.VehicleType;
import jakarta.persistence.*;
@Entity
@Table(name = "tb_motorcycle")
public class Motorcycle extends Vehicle{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String license;
    private Double mileage;
    public Motorcycle(){}

    public Motorcycle(Long idVehicle, String yearManufacture, String color, Long owner, VehicleType type,
                      Long id, String license, Double mileage) {
        super(idVehicle,yearManufacture,color,type,owner);
        this.id = id;
        this.license = license;
        this.mileage = mileage;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public Double getMileage() {
        return mileage;
    }

    public void setMileage(Double mileage) {
        this.mileage = mileage;
    }

}
