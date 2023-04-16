package com.eblju.dsdelivery.dto;

import com.eblju.dsdelivery.entities.Product;

import javax.validation.constraints.NotBlank;
import java.util.Objects;

public class ProductDto {

    private Long id;
    @NotBlank(message = "Campo obrigatório.")
    private String name;
    @NotBlank(message = "Campo obrigatório.")
    private Double price;
    @NotBlank(message = "Campo obrigatório.")
    private String description;
    @NotBlank(message = "Campo obrigatório.")
    private String imageUri;

    public ProductDto(){}

    public ProductDto(Long id, String name, Double price, String description, String imageUri) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUri = imageUri;
    }

    public ProductDto(Product entity) {
        id = entity.getId();
        name = entity.getName();
        price = entity.getPrice();
        description = entity.getDescription();
        imageUri = entity.getImageUri();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUri() {
        return imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product product)) return false;
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
