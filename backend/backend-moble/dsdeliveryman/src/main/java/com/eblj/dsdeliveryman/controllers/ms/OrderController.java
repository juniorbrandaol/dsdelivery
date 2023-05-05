package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.ms.OrderDto;
import com.eblj.dsdeliveryman.rest.services.impl.ms.OrderServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl service;

    @Operation(summary = "Get all orders")
    @GetMapping()
    @ResponseStatus(value = HttpStatus.OK)
    public List<OrderDto> findAll() {
        return service.findAll();
    }

    @Operation(summary = "Return an Order by id")
    @GetMapping(value="/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDto findByOrderId( @Parameter(description = "id of order to be searched") @PathVariable Long orderId){
        OrderDto dto = service.findByOrderId(orderId);
        return dto;
    }

    @Operation(summary = "Return an Order by status")
    @GetMapping(value="/statusId/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAllByStatus( @Parameter(description = "id of status to be searched") @PathVariable int statusId){
        List<OrderDto> dto = service.findAllByStatus(statusId);
        return dto;
    }
    @Operation(summary = "Updating an Order by status")
    @PutMapping(value="/{orderId}/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDto updateStatus(
            @Parameter(description = "id of order to be searched") @PathVariable Long orderId,
            @Parameter(description = "id of status to be searched") @PathVariable int statusId){
            return service.updateStatus(orderId,statusId);
    }

}
