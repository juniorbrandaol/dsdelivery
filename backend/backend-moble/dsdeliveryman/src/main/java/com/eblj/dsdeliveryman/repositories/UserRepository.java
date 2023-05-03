package com.eblj.dsdeliveryman.repositories;

import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

}
