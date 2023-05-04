package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto findByOrderId(Long id);
    List<OrderDto> findAll();
    List<OrderDto> findAllByStatus(int status);


}
