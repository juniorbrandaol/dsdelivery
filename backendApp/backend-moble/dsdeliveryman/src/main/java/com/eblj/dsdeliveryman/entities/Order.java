package com.eblj.dsdeliveryman.entities;
import com.eblj.dsdeliveryman.enuns.Status;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "tb_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private Long orderId;
    private String address;
    private Double total;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;
    private String client;
    private Instant createdAt;
    private Instant updatedAt;

    private Status status;
    public Order(){}

    public Order(Long id,User user, Long orderId,String address,Double total) {
        this.id =id;
        this.user =user;
        this.orderId = orderId;
        this.address = address;
        this.total = total;
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

    public User getUser() {
        return user;
    }

    public void setUser(User client) {
        this.user = user;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
    @PrePersist
    public void preCreated() {
        this.status = Status.ACCEPTED;
        createdAt = Instant.now();
    }
    @PreUpdate
    public void preUpdated() {
        updatedAt = Instant.now();
    }

    public Status getStatus() {
        return status;
    }
}
