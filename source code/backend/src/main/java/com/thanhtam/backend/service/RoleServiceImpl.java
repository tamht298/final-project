package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.repository.RoleRepository;
import com.thanhtam.backend.ultilities.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findByName(ERole name) {
        return roleRepository.findByName(name);
    }
}
