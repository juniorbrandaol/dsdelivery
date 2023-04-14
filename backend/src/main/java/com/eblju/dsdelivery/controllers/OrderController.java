package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.OrderDto;
import com.eblju.dsdelivery.rest.services.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
}
