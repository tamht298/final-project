package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.ultilities.ERole;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(ERole name);
}
