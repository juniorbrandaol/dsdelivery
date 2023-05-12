package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.ms.SmsDTO;
import com.eblj.dsdeliveryman.rest.services.impl.ms.SmsMsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/sms/send")
public class SmsMsController {

    @Autowired
    private SmsMsServiceImpl smsService;
    @Operation(summary = "Send a sms feignclient")
    @GetMapping()
    public void sendSms(@RequestBody SmsDTO dto){
        smsService.sendSms(dto);
    }
}
