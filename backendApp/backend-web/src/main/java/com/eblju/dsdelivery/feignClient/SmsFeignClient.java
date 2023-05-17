package com.eblju.dsdelivery.feignClient;

import com.eblju.dsdelivery.dto.fc.SmsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@FeignClient(name="notificationservice",url = "localhost:8186",path = "/sms")
public interface SmsFeignClient {
    @PostMapping
    SmsDTO sendSms( @RequestBody SmsDTO dto);
}
