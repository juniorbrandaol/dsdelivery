package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.OrderDto;
import com.eblj.dsdeliveryman.rest.services.impl.ms.OrderServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    @GetMapping(value="/orderId/{orderId}", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public OrderDto findByOrderId( @Parameter(description = "id of order to be searched") @PathVariable Long orderId){
        OrderDto dto = service.findByOrderId(orderId);
        return dto;
    }
}
