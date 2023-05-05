package com.eblj.dsdeliveryman.entities.ms;

import com.eblj.dsdeliveryman.entities.ms.pk.OrderItemPK;
import jakarta.persistence.EmbeddedId;
import java.io.Serializable;
public class OrderItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private OrderItemPK id = new OrderItemPK();
    private Integer quantity;
    private Double price;
    public OrderItem() {
    }
    public OrderItem(Order order, Product product, Integer quantity, Double price) {
        id.setOrder(order);
        id.setProduct(product);
        this.quantity = quantity;
        this.price = price;
    }
    public OrderItem(Product product, Integer quantity, Double price) {
        id.setProduct(product);
        this.quantity = quantity;
        this.price = price;
    }
    public OrderItemPK getOrderItemPK(){
        return id;
    }
    public Order getOrder() {
        return id.getOrder();
    }
    public void setOrder(Order order) {
        id.setOrder(order);
    }
    public Product getProduct() {
        return id.getProduct();
    }

    public void setProduct(Product product) {
        id.setProduct(product);
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
    public Double getSubTotal() {
        return price * quantity;
    }

}
