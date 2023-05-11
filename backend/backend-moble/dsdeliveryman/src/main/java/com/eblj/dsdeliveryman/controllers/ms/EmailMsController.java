package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.ms.EmailDTO;
import com.eblj.dsdeliveryman.rest.services.impl.ms.EmailMsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emails/send")
public class EmailMsController {

    @Autowired
    private EmailMsServiceImpl emailMsService;

    @Operation(summary = "Send an email feignclient")
    @PostMapping()
    @ResponseStatus(value = HttpStatus.OK)
    public void send(@RequestBody EmailDTO dto) {
        emailMsService.sendEmail(dto);
    }
}