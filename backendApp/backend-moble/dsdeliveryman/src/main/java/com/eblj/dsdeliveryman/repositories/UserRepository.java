package com.eblj.dsdeliveryman.repositories;

import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.enuns.Status;
import com.eblj.dsdeliveryman.interfaces.VehicleInteface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    @Modifying
    @Query(value=" UPDATE User user  SET user.confirmedValidation = true "
            + " WHERE user.id = :userId ")
    void switchValidation( @Param("userId") Long userId);

}
