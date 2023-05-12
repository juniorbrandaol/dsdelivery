package com.eblj.dsdeliveryman.repositories;
import com.eblj.dsdeliveryman.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
