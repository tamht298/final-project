package com.thanhtam.authorization.server.service;

import com.thanhtam.authorization.server.entity.User;

import java.util.List;

public interface UserService {
    public List<User> findAll();
}
