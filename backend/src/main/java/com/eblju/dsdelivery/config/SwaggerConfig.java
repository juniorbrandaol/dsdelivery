/*
* .useDefaultResponseMessages(false)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
* */

package com.eblju.dsdelivery.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.service.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
            .security(Arrays.asList(securityContext()))
            .info(apiInfo());
    }
    private Info apiInfo(){
        return (new Info()
                .title("Sistema de Vendas")
                .version("3.0")
                .contact(contact())
                .description("Api do projeto de Delivery")
                .termsOfService("http://swagger.io/terms/")
                .license(new License().name("GNU GENERAL PUBLIC LICENSE").url("http://springdoc.org"))
        );
    }

    private Contact contact(){
        return  new Contact()
                .name("Edilson Brandão")
                .email("edilson_brandaojunior@hotmail.com")
                .url("https://github.com/juniorbrandaol");
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "header");
    }
    private List<SecurityReference> defautAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope(
                "global","accessEverything"
        );
        AuthorizationScope[] scopes = new AuthorizationScope[1];
        scopes[0]= authorizationScope;
        SecurityReference reference = new SecurityReference("JWT",scopes);
        List<SecurityReference> auths = new ArrayList<>();
        auths.add(reference);
        return auths;
    }

    private SecurityRequirement securityContext(){
        return  (new SecurityRequirement());
        // .securityReferences(defautAuth())
        // .operationSelector(operationContext -> true)
        // .build();
    }
}
