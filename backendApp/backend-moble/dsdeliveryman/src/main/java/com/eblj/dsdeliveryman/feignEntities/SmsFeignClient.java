package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.CodeDTO;
import com.eblj.dsdeliveryman.dto.ms.EmailDTO;
import com.eblj.dsdeliveryman.dto.ms.SmsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@FeignClient(name="notificationservice",url = "localhost:8188",path = "/sms")
public interface SmsFeignClient {
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public void sendSms(@RequestBody SmsDTO dto);

}
