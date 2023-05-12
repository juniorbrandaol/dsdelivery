package com.eblj.dsdeliveryman.entities;

import com.eblj.dsdeliveryman.enuns.VehicleType;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
@Entity
@Table(name ="tb_vehicle")
public class Vehicle implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "yearManufacture")
    private String yearManufacture;
    @Column(name = "color")
    private String color;
    @Column(unique = true)
    private Long owner;
    @Column(name = "vehicleType")
    private String vehicleType;
    public Vehicle(){}
    public Vehicle(Long id, String yearManufacture, String color,VehicleType String, Long owner) {
        this.id = id;
        this.yearManufacture =yearManufacture;
        this.color = color;
        this.vehicleType = vehicleType;
        this.owner =owner;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYearManufacture() {
        return yearManufacture;
    }

    public void setYearManufacture(String yearManufacture) {
        this.yearManufacture = yearManufacture;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }
    public Long getOwner() {
        return owner;
    }
    public void setOwner(Long owner) {
        this.owner = owner;
    }

}
