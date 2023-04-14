package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.OrderDto;
import java.util.List;

public interface OrderService {
    List<OrderDto> findAll();
}
