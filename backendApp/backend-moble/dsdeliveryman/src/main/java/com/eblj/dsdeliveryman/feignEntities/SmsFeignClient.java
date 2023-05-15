package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.SmsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name="notificationservice",url = "localhost:8186",path = "/sms")
public interface SmsFeignClient {
    @PostMapping
    void sendSms( @RequestBody SmsDTO dto);
}
