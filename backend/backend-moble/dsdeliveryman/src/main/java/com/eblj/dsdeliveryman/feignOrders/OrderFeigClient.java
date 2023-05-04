package com.eblj.dsdeliveryman.feignOrders;

import com.eblj.dsdeliveryman.dto.OrderDto;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@FeignClient(name="delivery",url = "localhost:8080",path = "/orders")
public interface OrderFeighClient {
    @GetMapping("/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    OrderDto findByOrderId(@Parameter(description = "id of order to be searched") @PathVariable Long orderId);


}
