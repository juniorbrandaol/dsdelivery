package com.eblj.dsmeta.controllers;

import com.eblj.dsmeta.entities.Sale;
import com.eblj.dsmeta.rest.services.impl.SaleServiceImpl;
import com.eblj.dsmeta.rest.services.impl.SmsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.Map;

@RestController
@RequestMapping(value="/sales")
public class SaleController {

    @Autowired
    private SaleServiceImpl service;

    @Autowired
    private SmsServiceImpl smsService;

    @GetMapping(value={"","{minDate}/{maxDate}"})
    public Page<Sale> findSales(
           @PathVariable Map<String, String> pathVarsMap,Pageable pageable)  {
        String minDate = pathVarsMap.get("minDate");
        String maxDate = pathVarsMap.get("maxDate");
        return service.findSalles(minDate, maxDate, pageable);
    }

    @GetMapping("{id}/notification")
    public void notifySms( @PathVariable Long id){
      smsService.sendSms(id);
    }
}
