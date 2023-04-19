package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.rest.services.impl.OrderServiceImpl;
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

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAll(){
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto insert(@RequestBody @Valid OrderDto dto){
       return service.insert(dto);
    }

    @PutMapping("/{id}/delivered")
    @ResponseStatus(HttpStatus.OK)
    public OrderDto updateDelivery(@PathVariable Long id){
        OrderDto dto =service.updateDelivery(id);
        return dto;
    }

}
