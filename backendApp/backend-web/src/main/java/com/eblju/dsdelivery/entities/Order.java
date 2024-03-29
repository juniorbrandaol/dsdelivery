package com.eblju.dsdelivery.entities;

import com.eblju.dsdelivery.enuns.OrderStatus;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "tb_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Double longitude;
    @Column(nullable = false)
    private Instant moment;
    @Column(nullable = false)
    private OrderStatus status;
    @Column(nullable = false)
    @ManyToMany
    @JoinTable(name = "tb_order_product",
       joinColumns =  @JoinColumn(name = "order_id"),
       inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products = new HashSet<>();
    @ManyToOne(fetch = FetchType.EAGER)//***
    @JoinColumn(name = "client_id")
    private User client;

    @OneToMany(mappedBy = "id.order", fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    private Double total;
    public Order(){}
    public Order(Long id,User client, String address, Double latitude, Double longitude, Instant moment, OrderStatus status) {
        this.id = id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.moment = moment;
        this.status = status;
        this.client=client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public User getClient() {
        return client;
    }
    public void setClient(User client) {
        this.client = client;
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

    public Instant getMoment() {
        return moment;
    }

    public void setMoment(Instant moment) {
        this.moment = moment;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public List<OrderItem> getItems(){
        return items;
    }
    public void setItems(List<OrderItem> items) {
       this.items = items;
    }
    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getTotal(){
        double sum = 0.0;
        for(OrderItem i: items){
            sum+= i.getPrice()*i.getQuantity();
        }
        return sum;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order order)) return false;
        return Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
