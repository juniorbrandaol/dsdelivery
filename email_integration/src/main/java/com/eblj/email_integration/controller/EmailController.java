package com.eblj.email_integration.controller;

import com.eblj.email_integration.dto.CodeDTO;
import com.eblj.email_integration.dto.EmailDTO;
import com.eblj.email_integration.services.impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/emails")
public class EmailController {

    @Autowired
    private EmailServiceImpl service;
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void send( @RequestBody EmailDTO dto){
      service.sendEmail(dto);
    }

    @PostMapping("/confirmation")
    @ResponseStatus(HttpStatus.OK)
    public CodeDTO sendConfirmation(@RequestBody EmailDTO dto){
      return  service.sendEmailConfirmation(dto);
    }
}
