package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.ms.OrderDTO;
import com.eblj.dsdeliveryman.rest.services.impl.ms.OrderMsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders/ms")
public class OrderMsController {

    @Autowired
    private OrderMsServiceImpl service;

    @Operation(summary = "Get all orders feignclient")
    @GetMapping()
    @ResponseStatus(value = HttpStatus.OK)
    public List<OrderDTO> findAll() {
        return service.findAll();
    }

    @Operation(summary = "Return an Order by id feignclient")
    @GetMapping(value="/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO findByOrderId(
            @Parameter(description = "id of order to be searched")
            @PathVariable Long orderId){
        OrderDTO dto = service.findByOrderId(orderId);
        return dto;
    }

    @Operation(summary = "Return an Order by status feignclient")
    @GetMapping(value="/statusId/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByStatus(@Parameter(description = "id of status to be searched") @PathVariable int statusId){
        List<OrderDTO> dto = service.findAllByStatus(statusId);
        return dto;
    }


}
