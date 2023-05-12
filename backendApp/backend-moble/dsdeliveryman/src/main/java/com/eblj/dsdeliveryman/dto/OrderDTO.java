package com.eblj.dsdeliveryman.dto;

import com.eblj.dsdeliveryman.entities.Order;
import com.eblj.dsdeliveryman.enuns.Status;

import java.time.Instant;

public class OrderDTO {

    private Long id;
    private Long user;
    private Long orderId;
    private String address;
    private Double total;
    private Instant createdAt;

    private Instant updatedAt;

    private Status status;

    public OrderDTO(){}

    public OrderDTO(Long id, Long orderId, Long user,Status status,String address,Double total) {
        this.id = id;
        this.orderId= orderId;
        this.user = user;
        this.status = status;
        this.address = address;
        this.total = total;
    }

    public OrderDTO(Order entity){
        id = entity.getId();
        user = entity.getUser().getId();
        createdAt = entity.getCreatedAt();
        updatedAt = entity.getUpdatedAt();
        status = entity.getStatus();
        orderId = entity.getOrderId();
        address = entity.getAddress();
        total = entity.getTotal();
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getOrderId() {
        return orderId;
    }
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    public Long getUser() { return user;}
    public void setUser(Long user) {
        this.user = user;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    public Status getStatus() {
        return status;
    }
    public Instant getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
