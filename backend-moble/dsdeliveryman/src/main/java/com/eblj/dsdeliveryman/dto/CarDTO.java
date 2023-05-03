package com.eblj.dsdeliveryman.dto;

import com.eblj.dsdeliveryman.entities.Car;
import jakarta.validation.constraints.NotBlank;

public class CarDTO  {

    private Long id;
    @NotBlank(message = "Campo obrigatório.")
    private String license;
    @NotBlank(message = "Campo obrigatório.")
    private Double mileage;
    public CarDTO(){}

    public CarDTO(Long id, String license, Double mileage) {
        this.id = id;
        this.license = license;
        this.mileage = mileage;

    }
    public CarDTO(Car entity) {
        id = entity.getId();
        license = entity.getLicense();
        mileage = entity.getMileage();
    }
    public Long getId() {
        return id;
    }

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
