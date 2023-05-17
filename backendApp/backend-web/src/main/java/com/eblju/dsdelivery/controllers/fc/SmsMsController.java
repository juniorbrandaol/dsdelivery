package com.eblju.dsdelivery.controllers.fc;

import com.eblju.dsdelivery.dto.fc.SmsDTO;
import com.eblju.dsdelivery.rest.services.impl.fc.SmsMsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/sms/send")
public class SmsMsController {

    @Autowired
    private SmsMsServiceImpl smsService;
    @Operation(summary = "Send a sms feignclient")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping
    public SmsDTO sendSms(@RequestBody SmsDTO dto){
        return smsService.sendSms(dto);
    }

}
