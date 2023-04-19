package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.CompanyDto;
import com.eblju.dsdelivery.rest.services.impl.CompanyServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/companies")
public class CompanyController {

    @Autowired
    private CompanyServiceImpl service;

    @Operation(summary = "Get all Companies")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CompanyDto> findAll(){
      return  service.findAll();
    }

    @Operation(summary = "Get a Company by its id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CompanyDto getById(@Parameter(description = "id of company to be searched") @PathVariable Long id){
       return service.findById(id);
    }
}
