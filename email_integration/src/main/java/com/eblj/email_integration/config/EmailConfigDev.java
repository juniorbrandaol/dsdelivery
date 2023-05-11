package com.eblj.email_integration.config;

import com.eblj.email_integration.services.EmailService;
import com.eblj.email_integration.services.impl.EmailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class EmailConfigDev {
    @Bean
    public EmailService emailService(){
          return new EmailServiceImpl();
      }
}
