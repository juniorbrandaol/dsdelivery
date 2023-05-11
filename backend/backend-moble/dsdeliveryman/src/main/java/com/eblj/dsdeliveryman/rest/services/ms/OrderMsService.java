package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.ms.OrderDTO;

import java.util.List;

public interface OrderMsService {
    OrderDTO findByOrderId(Long id);
    List<OrderDTO> findAll();
    List<OrderDTO> findAllByStatus(int status);


}
