package com.eblju.dsdelivery.rest.services.impl;

import com.eblju.dsdelivery.dto.CompanyDto;
import com.eblju.dsdelivery.entities.Company;
import com.eblju.dsdelivery.repositories.CompanyRepository;
import com.eblju.dsdelivery.rest.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<CompanyDto> findAll(){
      //  return repository.findAll();
        List<Company> list = repository.findAll();
        return list.stream().map(obj-> new CompanyDto(obj)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDto findById(Long id) {
        Optional<Company> obj = repository.findById(id);
        Company entity = obj.orElseThrow(()-> new RuntimeException("Empresa não encontrada"));
         return new CompanyDto(entity);
        //Company list = repository.findById(id).get();
        //return new CompanyDto(list);
    }
}
