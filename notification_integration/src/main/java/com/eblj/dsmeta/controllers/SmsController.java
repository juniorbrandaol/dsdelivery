package com.eblj.dsmeta.controllers;

import com.eblj.dsmeta.dto.SmsDTO;
import com.eblj.dsmeta.rest.services.impl.SmsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping(value="/sms")
public class SmsController {

    @Autowired
    private SmsServiceImpl smsService;
    @GetMapping()
    public void sendSms(@RequestBody SmsDTO dto){
      smsService.sendSms(dto);
    }
}
