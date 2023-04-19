package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.CompanyDto;
import com.eblju.dsdelivery.rest.services.impl.CompanyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/companies")
public class CompanyController {

    @Autowired
    private CompanyServiceImpl service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CompanyDto> findAll(){
      return  service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CompanyDto getById(@PathVariable Long id){
       return service.findById(id);
    }
}
