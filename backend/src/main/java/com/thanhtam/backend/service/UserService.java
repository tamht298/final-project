package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    User createUser(User user);
}
