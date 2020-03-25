package com.thanhtam.authorization.server.repository;

import com.thanhtam.authorization.server.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Long> {
    public List<Profile> findAll();
}
