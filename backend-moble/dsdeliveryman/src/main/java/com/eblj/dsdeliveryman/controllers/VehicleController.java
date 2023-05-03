package com.eblj.dsdeliveryman.controllers;

import com.eblj.dsdeliveryman.dto.VehicleDTO;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;
import com.eblj.dsdeliveryman.rest.services.impl.VehicleServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleServiceImpl vehicleService;

    @Operation(summary = "Save a vehicle")
    @PostMapping("/save")
    @ResponseStatus(value = HttpStatus.CREATED)
    public VehicleDTO save(@RequestBody @Valid VehicleDTO dto) {
       VehicleDTO vehicle = vehicleService.save(dto);
       return vehicle;
    }

    @Operation(summary = "Get all vehicles")
    @GetMapping()
    @ResponseStatus(value = HttpStatus.OK)
    public List<VehicleInteface> findAll() {
        return vehicleService.findAll();
    }

    @Operation(summary = "Get vehicle by User id")
    @GetMapping("/userId/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public VehicleInteface findVehicleByUserId(
            @Parameter(description = "id of User to be searched") @PathVariable Long userId) {
        return vehicleService.findBYUserId(userId);
    }

    @Operation(summary = "Get vehicle by vehicle id")
    @GetMapping("/{vehicleId}")
    @ResponseStatus(value = HttpStatus.OK)
    public VehicleInteface findVehicleById(
            @Parameter(description = "id of Vehicle to be searched") @PathVariable Long vehicleId) {
        return vehicleService.findById(vehicleId);
    }

    @Operation(summary = "Get all vehicles by vehicle type")
    @GetMapping("/type/{type}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<VehicleInteface> findByVehicleType(  @Parameter(description = "type of vehicle to be searched")
                                                     @PathVariable String type) {
        return vehicleService.findByVehicleType(type);
    }

}
