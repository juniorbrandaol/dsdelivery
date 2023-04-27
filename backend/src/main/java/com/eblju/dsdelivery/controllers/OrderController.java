package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.enuns.OrderStatus;
import com.eblju.dsdelivery.rest.services.impl.OrderServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl service;

    @Operation(summary = "Get all Orders")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAll(){
        return service.findAll();
    }
    @Operation(summary = "Get all Orders by status pending")
    @GetMapping("/pending")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAllPending(){
        return service.findAllPending();
    }

    @Operation(summary = "Get all Orders by User id")
    @GetMapping({"/userId/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAllByUserId(@Parameter(description = "id of User id to be searched") @PathVariable Long id){
        return service.findAllByUserId(id);
    }

    @Operation(summary = "Get all Orders by User id and status")
    @GetMapping({"/userId/{id}/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAllByUserIdAndStatus(
                    @Parameter(description = "id of User id to be searched")
                    @PathVariable Long id ,
                    @Parameter(description = "id of Status to be searched")
                    @PathVariable(value="statusId", required=false) Integer  statusId )
         {
         return service.findAllByUserIdAndStatus(id,statusId);
    }
    @Operation(summary = "Save an Order")
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto save(@RequestBody @Valid OrderDto dto){
        Order order = service.insert(dto);
        return new OrderDto(order);
    }

    @Operation(summary = "Update an Order its by id and status id")
    @PutMapping("/{id}/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDto updateDelivery(
            @Parameter(description = "id of order to be searched") @PathVariable Long id,
            @Parameter(description = "id of status to be searched") @PathVariable int statusId)
        {
        OrderDto dto =service.updateDelivery(id,statusId);
        return dto;
    }

}
