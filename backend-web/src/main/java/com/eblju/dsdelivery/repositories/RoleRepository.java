package com.eblju.dsdelivery.repositories;
import com.eblju.dsdelivery.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

}
