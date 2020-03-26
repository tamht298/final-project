package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<User> getAllUsers();
    public Optional<User> getUserByUsername(String username);

}
