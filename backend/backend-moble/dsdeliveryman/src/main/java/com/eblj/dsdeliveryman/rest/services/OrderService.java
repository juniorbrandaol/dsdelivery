package com.eblj.dsdeliveryman.rest.services;

import com.eblj.dsdeliveryman.dto.OrderDTO;
import com.eblj.dsdeliveryman.entities.Order;

import java.util.List;

public interface OrderService {
    Order save(OrderDTO order);
    OrderDTO findById(Long id);
    List<OrderDTO> findAll();
    List<OrderDTO> findAllByUserId(Long id);
    List<OrderDTO> findAllByUserIdAndStatus(Long id, int status);
    void updateStatus(Long orderId, int statusId);
    void delete(Long id);

}
