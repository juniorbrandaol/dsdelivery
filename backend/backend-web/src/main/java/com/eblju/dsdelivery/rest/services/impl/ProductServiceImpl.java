package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.ProductDto;
import com.eblju.dsdelivery.entities.Product;
import com.eblju.dsdelivery.repositories.ProductRepository;
import com.eblju.dsdelivery.rest.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;
    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> findAll() {
        List<Product> list = repository.findAllByOrderByNameAsc();
        return list.stream().map(obj-> new ProductDto(obj)).collect(Collectors.toList());
    }
}
