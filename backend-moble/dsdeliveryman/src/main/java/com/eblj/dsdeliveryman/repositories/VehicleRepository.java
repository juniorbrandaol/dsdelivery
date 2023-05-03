package com.eblj.dsdeliveryman.repositories;

import com.eblj.dsdeliveryman.dto.VehicleDTO;
import com.eblj.dsdeliveryman.entities.Vehicle;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle,Long> {

    @Query(value ="SELECT v.id, v.color, v.owner, v.vehicle_type, v.year_manufacture, v.license," +
            " v.mileage FROM TB_VEHICLE v WHERE v.vehicle_type=:type"  ,nativeQuery = true   )
    List<VehicleInteface> findByVehicleType(String type);

    @Query(value ="SELECT v.id, v.color, v.owner, v.vehicle_type, v.year_manufacture, v.license," +
            " v.mileage FROM TB_VEHICLE v WHERE v.id=:id"  ,nativeQuery = true   )
    VehicleInteface findByVehicleId(Long id);
    @Query(value ="SELECT v.id, v.color, v.owner, v.vehicle_type, v.year_manufacture, v.license," +
            " v.mileage FROM TB_VEHICLE v WHERE v.owner=:id"  ,nativeQuery = true   )
    VehicleInteface findByOwner(Long id);
    @Query(value ="SELECT v.id, v.color, v.owner, v.vehicle_type, v.year_manufacture, v.license," +
            " v.mileage FROM TB_VEHICLE v" ,nativeQuery = true   )
    List<VehicleInteface> findAllVehicles();

}
