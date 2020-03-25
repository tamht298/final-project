package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User getUserByUsername(String username);

}
