package com.eblju.dsdelivery.dto;

import com.eblju.dsdelivery.entities.OrderItem;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.entities.pk.OrderItemPK;
import jakarta.persistence.EmbeddedId;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.stream.Collectors;

public class OrderItemDTO {

    @EmbeddedId
    private OrderItemPK idPK = new OrderItemPK();
    @NotBlank(message = "Campo obrigatório.")
    private Integer quantity;
    @NotBlank(message = "Campo obrigatório.")
    private Double price;
    private Long id;
    private String name;
    private String description;
    private  String imageUri;

    public OrderItemDTO(){}

    public OrderItemDTO(OrderItem obj) {
        this.quantity=obj.getQuantity();
        this.price= obj.getPrice();
        this.id = obj.getProduct().getId();
        this.name = obj.getProduct().getName();
        this.description = obj.getProduct().getDescription();
        this.imageUri = obj.getProduct().getImageUri();
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public String getDescription() {
        return description;
    }

    public String getImageUri() {
        return imageUri;
    }

}
