package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.OrderDTO;
import com.eblju.dsdelivery.entities.Order;
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
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<OrderDTO> findAll(){
        return service.findAll();
    }

    @Operation(summary = "Get all Orders by status pending")
    @GetMapping("/pending")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllPending(){
        return service.findAllPending();
    }

    @Operation(summary = "Get all Orders by User id")
    @GetMapping({"/getAll/userId/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByUserId(@Parameter(description = "id of User id to be searched") @PathVariable Long id){
        return service.findAllByUserId(id);
    }

    @Operation(summary = "Get all Orders by status")
    @GetMapping({"/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByStatus(
            @Parameter(description = "id of Status to be searched")
            @PathVariable(value="statusId") Integer  statusId )
    {
        return service.findAllByStatusId(statusId);
    }

    @Operation(summary = "Get all Orders by User id and status")
    @GetMapping({"/userId/{id}/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByUserIdAndStatus(
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
    public OrderDTO save(@RequestBody @Valid OrderDTO dto){
        Order order = service.insert(dto);
        return new OrderDTO(order);
    }

    /*REFAZER ESSE ENDPONT PARA INFOMAR QUEM ALTEROU O STATUS , SE CLIENTE OU ENTREGADOR*/
    @Operation(summary = "Update an Order its by id and status id")
    @PutMapping(value = "/{orderId}/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(
            @Parameter(description = "id of order to be searched") @PathVariable Long orderId,
            @Parameter(description = "id of status to be searched") @PathVariable int statusId)
        {
        service.updateStatus(orderId,statusId);
    }

    @Operation(summary = "Return an Order by id")
    @GetMapping("/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO findByOrderId(@Parameter(description = "id of order to be searched") @PathVariable Long orderId){
        OrderDTO dto = service.findByOrderId(orderId);
        return dto;

    }

}
