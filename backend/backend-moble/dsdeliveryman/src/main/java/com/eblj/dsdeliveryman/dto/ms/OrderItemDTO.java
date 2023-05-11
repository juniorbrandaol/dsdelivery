package com.eblj.dsdeliveryman.dto.ms;
import com.eblj.dsdeliveryman.entities.ms.OrderItem;
import com.eblj.dsdeliveryman.entities.ms.pk.OrderItemMsPK;
import jakarta.validation.constraints.NotBlank;

public class OrderItemDTO {

    private OrderItemMsPK idPK = new OrderItemMsPK();
    @NotBlank(message = "Campo obrigatório.")
    private Integer quantity;
    @NotBlank(message = "Campo obrigatório.")
    private Double price;
    private Long id;
    private String name;
    private String description;
    private  String imageUri;
    private Double total;

    public OrderItemDTO(){}

    public OrderItemDTO(OrderItem obj) {
        this.quantity=obj.getQuantity();
        this.price= obj.getPrice();
        this.id = obj.getProduct().getId();
        this.name = obj.getProduct().getName();
        this.description = obj.getProduct().getDescription();
        this.imageUri = obj.getProduct().getImageUri();
        this.total = obj.getTotal();
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

    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {this.total = total; }
}
