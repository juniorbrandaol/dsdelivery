package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.dto.ProductDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.enuns.OrderStatus;
import com.eblju.dsdelivery.repositories.OrderRepository;
import com.eblju.dsdelivery.repositories.ProductRepository;
import com.eblju.dsdelivery.rest.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository repository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> findAll() {
        List<Order> list = repository.findOrdersWithProducts();
        return list.stream().map(obj-> new OrderDto(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDto insert(OrderDto obj) {
        Order order = new Order(null,obj.getAddress(),obj.getLatitude(),obj.getLongitude(), Instant.now(), OrderStatus.PENDING);
        for(ProductDto p: obj.getProducts()){
            Product product = productRepository.getReferenceById(p.getId());
            order.getProducts().add(product);
        }
        order = repository.save(order);
        return new OrderDto(order);
    }
}
