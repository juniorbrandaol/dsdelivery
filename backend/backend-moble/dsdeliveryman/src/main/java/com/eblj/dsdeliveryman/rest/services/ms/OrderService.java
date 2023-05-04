package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto findByOrderId(Long id);
    List<OrderDto> findAll();
    List<OrderDto> findAllPending();
    List<OrderDto> findAllByUserId(Long id);
    List<OrderDto> findAllByUserIdAndStatus(Long id, int status);
    OrderDto updateDelivery(Long id,int status);

}
