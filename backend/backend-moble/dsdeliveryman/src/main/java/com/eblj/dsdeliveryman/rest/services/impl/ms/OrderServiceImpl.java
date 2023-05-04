package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.OrderDto;
import com.eblj.dsdeliveryman.feignOrders.OrderFeigClient;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import com.eblj.dsdeliveryman.rest.services.ms.OrderService;
import feign.FeignException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderFeigClient orderFeighClient;

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> findAll() {
        try {
            List<OrderDto> response = orderFeighClient.findAll();
            return response;
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<OrderDto> findAllByStatus( int status) {
        try {
          List<OrderDto> dto = orderFeighClient.findAllByStatus(status);
          return dto;
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto findByOrderId(Long orderId) {
        OrderDto response = orderFeighClient.findByOrderId(orderId);
        return response;
    }



}
