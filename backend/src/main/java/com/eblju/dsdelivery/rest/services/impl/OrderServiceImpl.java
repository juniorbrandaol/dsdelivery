package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.rest.services.OrderService;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Override
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return null;
    }
}
