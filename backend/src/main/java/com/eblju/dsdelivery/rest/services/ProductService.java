package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> findAll();
}
