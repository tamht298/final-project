package com.thanhtam.backend.controller;

import com.thanhtam.backend.entity.ServiceResult;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ServiceResult getAllUsers(){
         return new ServiceResult(HttpStatus.OK.value(), "get ok", userService.getAllUsers());

    }

    @GetMapping(value="/check-match")
    public boolean check(@RequestParam String pass){
        Optional<User> admin = userService.getUserByUsername("thanhtam28ss");
        return new BCryptPasswordEncoder().matches(pass, admin.get().getPassword());
    }
}
