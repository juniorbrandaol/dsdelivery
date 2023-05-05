package com.eblju.dsdelivery.dto;

import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.enuns.OrderStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDto {

    private Long id;
    @NotNull(message = "Informe o código do cliente")
    private Long client;
    @NotBlank(message = "Campo obrigatório.")
    private String address;
    private Double latitude;
    private Double longitude;
    private Instant moment;
    private OrderStatus status;
    private Double total;
    private List<ProductDto> products = new ArrayList<>();
    private List<OrderItemDTO> items= new ArrayList<>();

    public OrderDto(){}

    public OrderDto(Long id,Long client, String address, Double latitude, Double longitude,
                    Instant moment, OrderStatus status,Double total) {
        this.id = id;
        this.client = client;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.moment = moment;
        this.status = status;
        this.total= total;
    }

    public OrderDto(Order entity) {
        id = entity.getId();
        address = entity.getAddress();
        latitude = entity.getLatitude();
        longitude = entity.getLongitude();
        moment = entity.getMoment();
        status = entity.getStatus();
        total = entity.getTotal();
        client = entity.getClient().getId();
        items = entity.getItems()
                        .stream()
                        .map( obj-> new OrderItemDTO(obj)).collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getClient() {
        return client;
    }
    public void setCliente(Long client) {
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
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public List<ProductDto> getProducts() {
        return products;
    }
    public List<OrderItemDTO> getItems() {

        return items.stream().collect(Collectors.toList());
    }

}
