package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> findAll();
}
