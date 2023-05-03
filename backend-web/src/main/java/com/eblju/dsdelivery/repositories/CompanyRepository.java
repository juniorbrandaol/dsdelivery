package com.eblju.dsdelivery.repositories;

import com.eblju.dsdelivery.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CompanyRepository extends JpaRepository<Company,Long> {
}
