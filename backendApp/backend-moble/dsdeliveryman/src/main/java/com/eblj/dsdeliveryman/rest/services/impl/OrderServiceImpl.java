package com.eblj.dsdeliveryman.rest.services.impl;

import com.eblj.dsdeliveryman.dto.OrderDTO;
import com.eblj.dsdeliveryman.entities.Order;
import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.enuns.Status;
import com.eblj.dsdeliveryman.repositories.OrderRepository;
import com.eblj.dsdeliveryman.repositories.UserRepository;
import com.eblj.dsdeliveryman.rest.services.OrderService;
import com.eblj.dsdeliveryman.rest.services.exceptions.ConstraintViolationException;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Order save(OrderDTO dto) {
        Long idUser = dto.getUser();
        User user = userRepository
            .findById(idUser)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado "));
        try {
            Order order = new Order(null, user, dto.getOrderId(), dto.getAddress(), dto.getTotal());
            order = repository.save(order);
            return order;
        }catch (RuntimeException e){
            throw new ConstraintViolationException("Este pedido não pode ser salvo");
        }

    }

    @Transactional(readOnly = true)
    @Override
    public OrderDTO findById(Long id) {
       try {
           OrderDTO order = repository.findOrderById(id);
           return order;
       }catch (ResourceNotFoundException e){
           throw new ResourceNotFoundException("Pedido não encontrado");
       }
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAll() {
            List<Order> order = repository.findAll();
            return order.stream().map(obj -> new OrderDTO(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAllByUserId(Long id)  {

        User user = userRepository.getReferenceById(id);
        user.setId(id);
        List<Order> list = repository.findOrdersByUserId(user);
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAllByUserIdAndStatus(Long id, int status) {
        User user = userRepository.getReferenceById(id);
        Status statusId= Status.valueOf(status);
        user.setId(id);
        List<Order> list = repository.findOrdersByUserIdAndStatus(user,statusId);
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional()
    public void updateStatus(Long orderId, int status) {
        Status statusId= Status.valueOf(status);
        try {
            repository.updateStatusByOrderIdStatusId(orderId,statusId);
        }
        catch (EntityNotFoundException e){
            throw new ResourceNotFoundException("Pedido não encontrado");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public void delete(Long id) {
        try{
           Order order = repository.getReferenceById(id);
           repository.delete(id);
        }catch (ResourceNotFoundException e){
            throw new ResourceNotFoundException("Pedido não encontrado");
        }
    }

}