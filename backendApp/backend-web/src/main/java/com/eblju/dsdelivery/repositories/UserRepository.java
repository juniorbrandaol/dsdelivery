package com.eblju.dsdelivery.repositories;

import com.eblju.dsdelivery.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    @Modifying
    @Query(value=" UPDATE User user  SET user.email = :email "
            + " WHERE user.id = :userId")
    void updateUserEmailById(@Param("userId") Long userId, @Param("email") String email);

    @Modifying
    @Query(value=" UPDATE User user  SET user.phone = :phone "
            + " WHERE user.id = :userId")
    void updateUserPhoneById(@Param("userId") Long userId, @Param("phone") String phone);

    @Modifying
    @Query(value=" UPDATE User user  SET user.password = :password "
            + " WHERE user.id = :userId")
    void updateUserPasswordById(@Param("userId") Long userId, @Param("password") String password);
}
