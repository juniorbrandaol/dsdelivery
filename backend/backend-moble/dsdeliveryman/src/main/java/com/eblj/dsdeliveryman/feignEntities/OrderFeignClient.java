package com.eblj.dsdeliveryman.feignEntities;

import com.eblj.dsdeliveryman.dto.ms.OrderDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Component
@FeignClient(name="delivery-orders",url = "localhost:8080")
public interface OrderFeignClient {

    @GetMapping("/orders/orderId/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    OrderDto findByOrderId(
             @Parameter(description = "id of order to be searched") @PathVariable Long orderId);

    @Operation(summary = "Get all Orders")
    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.OK)
    List<OrderDto> findAll();

    @Operation(summary = "Get all Orders by status")
    @GetMapping({"/orders/statusId/{statusId}"})
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDto> findAllByStatus(
            @Parameter(description = "id of Status to be searched")
            @PathVariable(value="statusId") Integer  statusId
    );

    /*REFAZER ESSE ENDPONT PARA INFOMAR QUEM ALTEROU O STATUS , SE CLIENTE OU ENTREGADOR*/
    @Operation(summary = "Update an Order its by id and status id")
    @PutMapping("/orders/{orderId}/{statusId}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDto updateSatatusDelivery(
            @Parameter(description = "id of order to be searched") @PathVariable Long orderId,
            @Parameter(description = "id of status to be searched") @PathVariable Integer statusId
    );

}
