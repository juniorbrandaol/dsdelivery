package com.eblj.dsdeliveryman.feignClient;

import com.eblj.dsdeliveryman.dto.ms.OrderDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Component
@FeignClient(name="delivery-orders",url = "localhost:8080",path = "/orders")
public interface OrderFeignClient {


    @GetMapping("/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    OrderDTO findByOrderId(
             @Parameter(description = "id of order to be searched") @PathVariable Long orderId);

    @Operation(summary = "Get all Orders")
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    List<OrderDTO> findAll();

    @Operation(summary = "Get all Orders by status")
    @GetMapping({"/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    List<OrderDTO> findAllByStatus(
            @Parameter(description = "id of Status to be searched")
            @PathVariable(value="statusId") Integer  statusId
    );


}
