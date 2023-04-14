package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.repositories.OrderRepository;
import com.eblju.dsdelivery.rest.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository repository;
    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> findAll() {
        List<Order> list = repository.findOrdersWithProducts();
        return list.stream().map(obj-> new OrderDto(obj)).collect(Collectors.toList());
    }
}
