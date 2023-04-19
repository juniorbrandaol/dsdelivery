package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.CompanyDto;

import java.util.List;

public interface CompanyService {
    CompanyDto findById(Long id);
    List<CompanyDto> findAll();

}
