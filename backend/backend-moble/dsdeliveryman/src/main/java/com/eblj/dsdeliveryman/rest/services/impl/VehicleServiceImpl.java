package com.eblj.dsdeliveryman.rest.services.impl;

import com.eblj.dsdeliveryman.dto.VehicleDTO;
import com.eblj.dsdeliveryman.entities.Car;
import com.eblj.dsdeliveryman.entities.Motorcycle;
import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.entities.Vehicle;
import com.eblj.dsdeliveryman.enuns.VehicleType;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;
import com.eblj.dsdeliveryman.repositories.UserRepository;
import com.eblj.dsdeliveryman.repositories.VehicleRepository;
import com.eblj.dsdeliveryman.rest.services.VehicleService;
import com.eblj.dsdeliveryman.rest.services.exceptions.ConstraintViolationException;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public VehicleDTO save(VehicleDTO dto) {

        try {
            User userId = userRepository
                    .findById(dto.getOwner())
                    .orElseThrow(() -> new ResourceNotFoundException("proprietário não encontrado "));
            VehicleType vehicleType = VehicleType.valueOf(dto.getVehicleType());
            if (vehicleType == vehicleType.BICICLETA) {
                Vehicle vehicle = new Vehicle();
                vehicle.setColor(dto.getColor());
                vehicle.setYearManufacture(dto.getYearManufacture());
                vehicle.setOwner(dto.getOwner());
                vehicle.setVehicleType(dto.getVehicleType().toString());
                repository.save(vehicle);
                return new VehicleDTO(vehicle);

            } else if (vehicleType == vehicleType.MOTOCICLETA) {
                Motorcycle motorcycle = new Motorcycle();
                motorcycle.setColor(dto.getColor());
                motorcycle.setYearManufacture(dto.getYearManufacture());
                motorcycle.setOwner(dto.getOwner());
                motorcycle.setVehicleType(dto.getVehicleType().toString());
                motorcycle.setLicense(dto.getLicense());
                motorcycle.setMileage(dto.getMileage());
                motorcycle.setId(dto.getId());
                repository.save(motorcycle);
                return new VehicleDTO(motorcycle, dto.getLicense(), dto.getMileage());
            } else {
                Car car = new Car();
                car.setColor(dto.getColor());
                car.setYearManufacture(dto.getYearManufacture());
                car.setOwner(dto.getOwner());
                car.setVehicleType(dto.getVehicleType().toString());
                car.setLicense(dto.getLicense());
                car.setMileage(dto.getMileage());
                car.setId(dto.getId());
                repository.save(car);
                return new VehicleDTO(car, dto.getLicense(), dto.getMileage());
            }
        }catch (Exception  e){
            throw new ConstraintViolationException("Erro");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleInteface> findAll() {
        List<VehicleInteface> vehicles = repository.findAllVehicles();
        return vehicles;
    }

    @Override
    public List<VehicleInteface> findByVehicleType(String type) {
        VehicleType vehicleType = VehicleType.valueOf(type);
        List<VehicleInteface>  vehicles = repository.findByVehicleType(vehicleType.name());
        return  vehicles;
    }

    @Override
    @Transactional(readOnly = true)
    public VehicleInteface findBYUserId(Long id) {

        try {
            User userId = userRepository.getReferenceById(id);
            VehicleInteface vehicleInteface = repository.findByOwner(userId.getId());
            if(!vehicleInteface.equals(null)) {
                return vehicleInteface;
            }else{
                return  null;
            }
        }catch (ResourceNotFoundException  | NullPointerException e) {
           throw  new ResourceNotFoundException("Nenhum veículi encontrado para este usuário. ");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public VehicleInteface findById(Long id) {
        try {
            Vehicle vehicle = repository.getReferenceById(id);
            VehicleInteface vehicleInteface= repository.findByVehicleId(vehicle.getId());
            return vehicleInteface;
        }catch (ResourceNotFoundException | NullPointerException e){
            throw new ResourceNotFoundException("Veículo não encontrado");
        }
    }

}
