package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Component
@FeignClient(name="delivery-users",url = "localhost:8080",path = "/users")
public interface UserFeignClient {

    @Operation(summary = "Get an User by its id")
    @GetMapping("/{id}")
    UserDto findById(@Parameter(description = "id of user to be searched") @PathVariable Long id) ;

}
