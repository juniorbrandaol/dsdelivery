package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.ProductDto;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.rest.services.impl.ProductServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/products")
public class ProductController {
    @Autowired
    private ProductServiceImpl service;

    @Operation(summary = "Get all Products")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductDto> findAll(){
        return service.findAll();
    }

}
