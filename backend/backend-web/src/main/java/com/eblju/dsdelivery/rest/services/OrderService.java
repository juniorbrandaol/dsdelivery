package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.OrderDTO;
import com.eblju.dsdelivery.entities.Order;

import java.util.List;

public interface OrderService {
    List<OrderDTO> findAll();
    List<OrderDTO> findAllPending();
    List<OrderDTO> findAllByUserId(Long id);
    List<OrderDTO> findAllByStatusId(int status);
    List<OrderDTO> findAllByUserIdAndStatus(Long id, int status);
    Order insert(OrderDTO obj);
    void updateStatus(Long id,int status);
    OrderDTO findByOrderId(Long id);

}
