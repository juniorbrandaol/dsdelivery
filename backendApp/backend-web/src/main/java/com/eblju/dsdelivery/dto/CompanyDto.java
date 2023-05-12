package com.eblju.dsdelivery.dto;

import com.eblju.dsdelivery.entities.Company;

import jakarta.validation.constraints.NotBlank;
public class CompanyDto {
    private Long id;
    @NotBlank(message = "Campo obrigatório.")
    private String address;
    private Double latitude;
    private Double longitude;
    private String cnpj;

    public CompanyDto(){}

    public CompanyDto(Long id, String address, Double latitude, Double longitude, String cnpj) {
        this.id = id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cnpj = cnpj;
    }

    public CompanyDto(Company entity) {
        id = entity.getId();
        address = entity.getAddress();
        latitude = entity.getLatitude();
        longitude = entity.getLongitude();
        cnpj = entity.getCnpj();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
}
