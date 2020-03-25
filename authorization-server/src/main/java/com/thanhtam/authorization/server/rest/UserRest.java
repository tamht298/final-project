package com.thanhtam.authorization.server.rest;

import com.thanhtam.authorization.server.entity.User;
import com.thanhtam.authorization.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UserRest {
    @Autowired
    private UserService userService;

    @GetMapping(value="/users")
    @PreAuthorize("hasAuthority('read_user')")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping(value="/welcome")
    public String welcome(){
        return "hello";
    }
}
