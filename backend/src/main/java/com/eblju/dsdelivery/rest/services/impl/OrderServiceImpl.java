package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.dto.ProductDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.enuns.OrderStatus;
import com.eblju.dsdelivery.repositories.OrderRepository;
import com.eblju.dsdelivery.repositories.ProductRepository;
import com.eblju.dsdelivery.repositories.UserRepository;
import com.eblju.dsdelivery.rest.services.OrderService;
import com.eblju.dsdelivery.rest.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private UserRepository userRepository;
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
    @Transactional(readOnly = true)
    public List<OrderDto> findAllByUserId(Long id)  {

        User user = userRepository.getReferenceById(id);
        user.setId(id);
        List<Order> list = repository.findOrdersWithProductsByUserId(user);
        return list.stream().map(obj-> new OrderDto(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDto insert(OrderDto obj) {

        Long idCliente = obj.getClient();
        User user = userRepository
                .findById(idCliente)
                .orElseThrow(()->new ResourceNotFoundException("Usuário não encontrado "+idCliente ) );
        Order order = new Order(null,user,obj.getAddress(),obj.getLatitude(),obj.getLongitude(), Instant.now(), OrderStatus.PENDING);
        for(ProductDto p: obj.getProducts()){
            Product product = productRepository.getReferenceById(p.getId());
            order.getProducts().add(product);
        }
        order = repository.save(order);
        return new OrderDto(order);
    }

    @Override
    @Transactional
    public OrderDto updateDelivery(Long id) {
       Order order = repository.getReferenceById(id);
       order.setStatus(OrderStatus.DELIVERED);
       order= repository.save(order);
       return new OrderDto(order);
    }
}
