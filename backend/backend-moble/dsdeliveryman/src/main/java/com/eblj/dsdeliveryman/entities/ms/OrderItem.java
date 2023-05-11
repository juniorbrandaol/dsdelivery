package com.eblj.dsdeliveryman.entities.ms;

import com.eblj.dsdeliveryman.entities.ms.pk.OrderItemMsPK;
import java.io.Serializable;
public class OrderItem implements Serializable {

    private static final long serialVersionUID = 1L;

    private OrderItemMsPK id = new OrderItemMsPK();
    private Integer quantity;
    private Double price;
    private Double total;
    public OrderItem() {
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
    public void setTotal(Double total) { this.total = total; }
    public Double getTotal(){
        double sum = 0.0;
        sum = price*quantity;
        return sum;
    }

}
