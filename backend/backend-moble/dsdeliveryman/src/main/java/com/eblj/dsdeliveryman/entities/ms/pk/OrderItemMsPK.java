package com.eblj.dsdeliveryman.entities.ms.pk;

import com.eblj.dsdeliveryman.entities.ms.Order;
import com.eblj.dsdeliveryman.entities.ms.Product;
import java.io.Serializable;

/*
 CLASSE AUXILIAR
 */
public class OrderItemMsPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private Order order;
    private Product product;
    public OrderItemMsPK(){}
    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

}
