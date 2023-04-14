package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.entities.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAll();
}
