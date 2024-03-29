package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.OrderDTO;
import com.eblju.dsdelivery.dto.OrderItemDTO;
import com.eblju.dsdelivery.dto.ProductDto;
import com.eblju.dsdelivery.entities.Order;
import com.eblju.dsdelivery.entities.OrderItem;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.enuns.OrderStatus;
import com.eblju.dsdelivery.repositories.OrderItemRepository;
import com.eblju.dsdelivery.repositories.OrderRepository;
import com.eblju.dsdelivery.repositories.ProductRepository;
import com.eblju.dsdelivery.repositories.UserRepository;
import com.eblju.dsdelivery.rest.services.OrderService;
import com.eblju.dsdelivery.rest.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository repository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAll() {
       List<Order> list = repository.findAllFetcher();
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAllPending() {
        List<Order> list = repository.findOrdersStatusPending();
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
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
    public List<OrderDTO> findAllByStatusId(int status) {
        OrderStatus statusId= OrderStatus.valueOf(status);
        List<Order> list = repository.findAllByStatusId(statusId);
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> findAllByUserIdAndStatus(Long id, int status) {
        User user = userRepository.getReferenceById(id);
        OrderStatus statusId= OrderStatus.valueOf(status);
        user.setId(id);
        List<Order> list = repository.findOrdersByUserIdAndStatus(user,statusId);
        return list.stream().map(obj-> new OrderDTO(obj)).collect(Collectors.toList());
    }
    @Override
    @Transactional
    public Order insert(OrderDTO dto) {

        Long idCliente = dto.getClient();
        User user = userRepository
                .findById(idCliente)
                .orElseThrow(()->new ResourceNotFoundException("Usuário não encontrado ") );
        Order order = new Order(null,user,dto.getAddress(),dto.getLatitude(),dto.getLongitude(), Instant.now(), OrderStatus.PENDING);
        for(ProductDto p: dto.getProducts()){
            Product product = productRepository.getReferenceById(p.getId());
            order.getProducts().add(product);
        }
        List<OrderItem> items= toOrderItem(order,dto.getItems());
        order.setItems(items);
        order.setTotal(order.getTotal());
        order = repository.save(order);
        orderItemRepository.saveAll(items);
        return order;
    }

    @Override
    @Transactional
    public void updateStatus(Long id,int status) {

        try {
            Order order = repository.getReferenceById(id);
            OrderStatus statusId= OrderStatus.valueOf(status);
            order.setStatus(statusId);
            repository.updateStatusByStatusId(id,statusId);

        }
        catch (EntityNotFoundException e){
            throw new ResourceNotFoundException("Pedido não encontrado");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO findByOrderId(Long id) {
        Order dto = repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Erro"));
        return new OrderDTO(dto);
    }

    private List<OrderItem> toOrderItem(Order order, List<OrderItemDTO> items){

        if(items.isEmpty()){
            throw new ResourceNotFoundException("Lista de items vazia");
        }
        return items
                .stream()
                .map(dto ->{
                    Long idProduct = dto.getId();
                    Product product=  productRepository
                            .findById(idProduct)
                            .orElseThrow(()-> new ResourceNotFoundException("Produto não enconrado "+idProduct));
                    OrderItem orderItem = new OrderItem();
                    orderItem.setQuantity(dto.getQuantity());
                    orderItem.setPrice(product.getPrice());
                    orderItem.setOrder(order);
                    orderItem.setProduct(product);
                    orderItem.setTotal(orderItem.getTotal());
                    return  orderItem;
                } ).collect(Collectors.toList());
    }


}
