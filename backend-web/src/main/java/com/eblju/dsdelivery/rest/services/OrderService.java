package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.enuns.OrderStatus;

import java.util.List;

public interface OrderService {
    List<OrderDto> findAll();
    List<OrderDto> findAllPending();
    List<OrderDto> findAllByUserId(Long id);
    List<OrderDto> findAllByUserIdAndStatus(Long id, int status);
    Order insert(OrderDto obj);
    OrderDto updateDelivery(Long id,int status);

}
