package com.eblj.dsdeliveryman.controllers;

import com.eblj.dsdeliveryman.dto.OrderDTO;
import com.eblj.dsdeliveryman.entities.Order;
import com.eblj.dsdeliveryman.rest.services.impl.OrderServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl service;

    @Operation(summary = "Save an Order")
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDTO save(@RequestBody @Valid OrderDTO dto){
        Order order = service.save(dto);
        return new OrderDTO(order);
    }

    @Operation(summary = "Get all ordeers")
    @GetMapping()
    @ResponseStatus(value = HttpStatus.OK)
    public List<OrderDTO> findAll(){
        return service.findAll();
    }

    @Operation(summary = "Get all Orders by User id")
    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByUserId(@Parameter(description = "id of User id to be searched") @PathVariable Long id){
        return service.findAllByUserId(id);
    }

    @Operation(summary = "Get all Orders by User id and status")
    @GetMapping({"/userId/{id}/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> findAllByUserIdAndStatus(
            @Parameter(description = "id of User id to be searched")
            @PathVariable Long id ,
            @Parameter(description = "id of Status to be searched")
            @PathVariable(value="statusId") Integer  statusId ){
        return service.findAllByUserIdAndStatus(id,statusId);
    }

    @Operation(summary = "Updating an Order by order id and status id ")
    @PutMapping("/{orderId}/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(
            @Parameter(description = "id of order to be searched") @PathVariable Long orderId,
            @Parameter(description = "id of status to be searched") @PathVariable int statusId){
        service.updateStatus(orderId,statusId);
    }

    @Operation(summary = "Deleting an Order by id")
    @DeleteMapping("/{id}")
    public void delete(
            @Parameter(description = "id of order to be searched") @PathVariable Long id){
        service.delete(id);
    }
}
