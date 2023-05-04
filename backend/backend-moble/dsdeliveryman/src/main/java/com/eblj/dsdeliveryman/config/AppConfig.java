package com.eblj.dsdeliveryman.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate(){ //retorna uma instância(única),sigton, do tipo RestTemplate
      return new RestTemplate();
    }
}
