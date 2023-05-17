package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.ms.OrderDTO;
import com.eblj.dsdeliveryman.feignClient.OrderFeignClient;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import com.eblj.dsdeliveryman.rest.services.ms.OrderMsService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderMsServiceImpl implements OrderMsService {

    @Autowired
    private OrderFeignClient orderFeighClient;

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAll() {
        try {
            List<OrderDTO> response = orderFeighClient.findAll();
            return response;
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAllByStatus(int status) {
        try {
          List<OrderDTO> dto = orderFeighClient.findAllByStatus(status);
          return dto;
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO findByOrderId(Long orderId) {

        try {
            OrderDTO order = orderFeighClient.findByOrderId(orderId);
            if (order == null) {
                throw new ResourceNotFoundException("Pedido não encontrado");
            } else {
                return order;
            }
        }catch (FeignException.FeignClientException e){
            throw new ResourceNotFoundException("Pedido não encontrado");
        }
    }

}
