package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.OrderDto;
import com.eblj.dsdeliveryman.entities.ms.Order;
import com.eblj.dsdeliveryman.feignOrders.OrderFeighClient;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import com.eblj.dsdeliveryman.rest.services.ms.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.webjars.NotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderFeighClient orderFeighClient;

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> findAll() {

        return null;
    }

    @Override
    public List<OrderDto> findAllPending() {
        return null;
    }

    @Override
    public List<OrderDto> findAllByUserId(Long id) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto findByOrderId(Long orderId) {

        OrderDto response = orderFeighClient.findByOrderId(orderId);
        return response;
    }

    @Override
    public List<OrderDto> findAllByUserIdAndStatus(Long id, int status) {
        return null;
    }
    @Override
    public OrderDto updateDelivery(Long id, int status) {
        return null;
    }
}
