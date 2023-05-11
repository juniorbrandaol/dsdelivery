package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.EmailDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@FeignClient(name="emailservice",url = "localhost:8181",path = "/emails")
public interface EmailFeignClient {
     @PostMapping()
     @ResponseStatus(HttpStatus.NO_CONTENT)
     public void sendEmail( @RequestBody EmailDTO dto);
}
