package com.eblju.dsdelivery.repositories;

import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.enuns.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query(nativeQuery = true,value =
            " SELECT DISTINCT  orders.* FROM tb_order orders, tb_product products, tb_order_item oi"
                    +" INNER JOIN  tb_order_item ON orders.id = oi.order_id"
                    +" WHERE oi.product_id = products.id ORDER BY orders.moment DESC"
    )
    List<Order> findAllFetcher();

    @Query(nativeQuery = true,value =
            " SELECT DISTINCT  orders.* FROM tb_order orders, tb_product products, tb_order_item oi"
                    +" INNER JOIN  tb_order_item ON orders.id = oi.order_id"
                    +" WHERE oi.product_id = products.id and  orders.status=0 ORDER BY orders.moment DESC "
    )
    List<Order> findOrdersStatusPending();

   @Query(value="SELECT DISTINCT  (obj) FROM Order obj" +
           " JOIN FETCH obj.products WHERE( obj.client=:id) ORDER BY obj.moment DESC")
    List<Order> findOrdersByUserId(@Param("id") User id);
    @Query(value="SELECT DISTINCT  (obj) FROM Order obj JOIN FETCH obj.products" +
            " WHERE (obj.client=:id) AND ( :status IS NULL OR obj.status=:status) ORDER BY obj.moment DESC")
    List<Order> findOrdersByUserIdAndStatus(@Param("id")User id,@Param("status") OrderStatus status);

    @Query(value="SELECT DISTINCT  (obj) FROM Order obj" +
            " JOIN FETCH obj.products WHERE( obj.status=:status) ORDER BY obj.moment DESC")
    List<Order> findAllByStatusId(@Param("status") OrderStatus status);

    @Modifying
    @Query(value=" UPDATE Order order  SET order.status = :status "
            + " WHERE order.id = :orderId")
    void updateStatusByStatusId(@Param("orderId") Long orderId, @Param("status") OrderStatus status);
}
