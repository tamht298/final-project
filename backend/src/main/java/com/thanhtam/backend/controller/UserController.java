package com.thanhtam.backend.controller;

import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping(value="/api")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value="/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return userService.getAllUsers();

    }
    @GetMapping(value="/check-match")
    public boolean check(@RequestParam String pass){
        User admin = userService.getUserByUsername("thanhtam28ss");

        return new BCryptPasswordEncoder().matches(pass, admin.getPassword());
    }
}
