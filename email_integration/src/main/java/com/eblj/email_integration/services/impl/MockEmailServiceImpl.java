package com.eblj.email_integration.services.impl;

import com.eblj.email_integration.dto.CodeDTO;
import com.eblj.email_integration.dto.EmailDTO;
import com.eblj.email_integration.services.EmailService;
import com.sendgrid.SendGrid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
public class MockEmailServiceImpl implements EmailService {
    @Autowired
    private SendGrid sendGrid;

    private static Logger LOG = LoggerFactory.getLogger(EmailService.class);
    @Override
    public void sendEmail(EmailDTO dto) {
         LOG.info("Sending email to: " +dto.getTo());
         LOG.info("Email sent! ");
    }

    @Override
    public CodeDTO sendEmailConfirmation(EmailDTO dto) {
      return new CodeDTO(dto.getBody(),dto.getTo());
    }
}

