package com.eblj.dsdeliveryman.controllers.ms;

import com.eblj.dsdeliveryman.dto.ms.UserMsDTO;
import com.eblj.dsdeliveryman.rest.services.impl.ms.UserMsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserMsController {
    @Autowired
    private UserMsServiceImpl userMsService;
    @Operation(summary = "Return an User by id")
    @GetMapping("/ms/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserMsDTO findById(@Parameter(description = "id of user to be searched") @PathVariable Long userId ){
        return userMsService.findById(userId) ;
    }
}
