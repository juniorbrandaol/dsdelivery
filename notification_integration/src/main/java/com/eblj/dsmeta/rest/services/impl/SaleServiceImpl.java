package com.eblj.dsmeta.rest.services.impl;

import com.eblj.dsmeta.entities.Sale;
import com.eblj.dsmeta.repositores.SaleRepository;
import com.eblj.dsmeta.rest.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleRepository repository;
    @Override
    public Page<Sale> findSalles(String minDate,String maxDate,Pageable pageable) {
        LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());

        LocalDate min = minDate==null ? today.minusDays(365) : LocalDate.parse(minDate);
        LocalDate max = maxDate==null ? today : LocalDate.parse(maxDate);
        return repository.findSales(min,max,pageable);
    }
}
