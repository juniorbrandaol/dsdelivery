package com.eblj.dsmeta.controllers;

import com.eblj.dsmeta.dto.SmsDTO;
import com.eblj.dsmeta.rest.services.impl.SmsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/sms")
public class SmsController {

    @Autowired
    private SmsServiceImpl smsService;
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public SmsDTO sendSms(@RequestBody SmsDTO dto){
      return smsService.sendSms(dto);
    }

}
