package com.eblj.dsdeliveryman.rest.services;
import com.eblj.dsdeliveryman.dto.CarDTO;
import com.eblj.dsdeliveryman.dto.VehicleDTO;
import com.eblj.dsdeliveryman.entities.Vehicle;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;

import java.util.List;
public interface VehicleService {
    VehicleDTO save(VehicleDTO dto);
    List<VehicleInteface> findAll();
    List<VehicleInteface> findByVehicleType(String type);
    VehicleInteface findBYUserId(Long id);
    VehicleInteface findById(Long id);

}
