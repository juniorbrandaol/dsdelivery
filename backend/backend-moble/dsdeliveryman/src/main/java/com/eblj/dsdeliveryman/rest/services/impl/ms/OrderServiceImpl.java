package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.ms.OrderDto;
import com.eblj.dsdeliveryman.feignEntities.OrderFeignClient;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import com.eblj.dsdeliveryman.rest.services.ms.OrderService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderFeignClient orderFeighClient;

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
    @Transactional(readOnly = true)
    public List<OrderDto> findAllByStatus( int status) {
        try {
          List<OrderDto> dto = orderFeighClient.findAllByStatus(status);
          return dto;
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    @Transactional()
    public OrderDto updateStatus(Long orderId,Integer statusId) {
        try {
           return  orderFeighClient.updateSatatusDelivery(orderId,statusId);
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto findByOrderId(Long orderId) {
        return orderFeighClient.findByOrderId(orderId);
    }

}
