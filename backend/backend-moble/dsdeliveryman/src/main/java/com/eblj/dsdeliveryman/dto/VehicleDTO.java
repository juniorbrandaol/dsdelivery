package com.eblj.dsdeliveryman.dto;

import com.eblj.dsdeliveryman.entities.Vehicle;
import com.eblj.dsdeliveryman.enuns.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class VehicleDTO {
    private Long id;
    private String yearManufacture;
    private String color;
    private Long owner;
    private String vehicleType;
    private String license;
    private Double mileage;

    public VehicleDTO(Vehicle entity,String license,Double mileage) {
        id = entity.getId();
        yearManufacture = entity.getYearManufacture();
        color = entity.getColor();
        owner = entity.getOwner();
        vehicleType = entity.getVehicleType();
        this.license= license;
        this.mileage = mileage;
    }

    public VehicleDTO(Vehicle entity) {
        id = entity.getId();
        yearManufacture = entity.getYearManufacture();
        color = entity.getColor();
        owner = entity.getOwner();
        vehicleType = entity.getVehicleType();
    }
    public VehicleDTO(){ super();}
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
    public Long getOwner() {
        return owner;
    }
    public String getVehicleType() {
        return vehicleType;
    }
    public String getLicense() {return license;}
    public Double getMileage() {
        return mileage;
    }

    @Override
    public String toString() {
        return "VehicleDTO{" +
                "id=" + id +
                ", yearManufacture=" + yearManufacture +
                ", color='" + color + '\'' +
                ", owner=" + owner +
                ", vehicleType=" + vehicleType +
                ", license='" + license + '\'' +
                ", mileage=" + mileage +
                '}';
    }
}
