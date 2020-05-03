package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByEmailOrUsername(String email, String username);

    public Page<User> findAll(Pageable pageable);

    public Page<User> findAllByDeleted(boolean deleted, Pageable pageable);


}
