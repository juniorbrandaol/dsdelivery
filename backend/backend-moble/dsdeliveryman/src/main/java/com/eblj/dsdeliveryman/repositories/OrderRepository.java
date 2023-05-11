package com.eblj.dsdeliveryman.repositories;

import com.eblj.dsdeliveryman.dto.OrderDTO;
import com.eblj.dsdeliveryman.entities.Order;
import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.enuns.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("from Order where orderId =:orderId")
    OrderDTO findOrderById(@Param("orderId") Long orderId);

    @Query("from Order where user =:userId ORDER BY createdAt DESC")
    List<Order> findOrdersByUserId(@Param("userId") User userId);

    @Query("from Order where user =:userId AND status=:status ORDER BY createdAt DESC")
    List<Order> findOrdersByUserIdAndStatus(@Param("userId") User userId, @Param("status") Status status);

    @Modifying
    @Query(value=" UPDATE Order order  SET order.status = :status "
            + " WHERE order.orderId = :orderId ")
    void updateStatusByOrderIdStatusId(@Param("orderId") Long orderId, @Param("status")  Status status);

    @Modifying
    @Query(value=" DELETE Order order  WHERE order.Id = :id ")
    void delete(@Param("id") Long id);

}
