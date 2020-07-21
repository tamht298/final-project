package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.ultilities.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
