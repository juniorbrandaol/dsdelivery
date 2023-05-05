package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.UserMsDTO;
import io.jsonwebtoken.MalformedJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Component
@FeignClient(name="delivery-users",url = "localhost:8080")
public interface UserFeignClient {

    @Operation(summary = "Get an User by its id")
    @GetMapping("/users/{id}")
    UserMsDTO findById(@Parameter(description = "id of user to be searched") @PathVariable Long id) ;

}
