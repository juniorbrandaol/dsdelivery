package com.eblju.dsdelivery.repositories;

import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query(value="SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.products" +
            " WHERE obj.status=0 ORDER BY obj.moment ASC")
     List<Order> findOrdersWithProducts();

    @Query(value="SELECT DISTINCT  obj FROM Order obj JOIN FETCH obj.products" +
            " WHERE  obj.status=0 AND obj.client=:id ORDER BY obj.moment ASC")
    List<Order> findOrdersWithProductsByUserId(User id);



}
