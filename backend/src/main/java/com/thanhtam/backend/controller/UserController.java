package com.thanhtam.backend.controller;

import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.RoleService;
import com.thanhtam.backend.service.UserService;
import com.thanhtam.backend.ultilities.ERole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api/users")
public class UserController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/username/{uid}")
    public ResponseEntity<?> getUser(@PathVariable String uid){
        Optional<User> user = userService.getUserByUsername(uid);
        if(!user.isPresent()){
            return ResponseEntity.ok(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Tên đăng nhâp "+uid+" không tìm thấy!", null)) ;
        }
        return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "Lấy thông tin user " + uid +" thành công!", user)) ;
    }

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get list of users successfully!", users));
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

//        Check username is exists?
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(new ServiceResult(HttpStatus.CONFLICT.value(), "Tên đăng nhập đã có người sử dụng!", ""));

        }
//        Check email is exists?
        if (userService.existsByUsername(user.getEmail())) {
            return ResponseEntity.badRequest().body(new ServiceResult(HttpStatus.CONFLICT.value(), "Email đã có người sử dụng!", ""));

        }

//        Create new user
//        User newUser = new User(user.getUsername(), passwordEncoder.encode(user.getUsername()), user.getEmail(), user.getProfile());
//
//        Set<Role> reqRoles = user.getRoles();
//        Set<Role> roles = new HashSet<>();
//
//        if (reqRoles == null) {
//            Role userRole = roleService.findByName(ERole.ROLE_STUDENT).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//            roles.add(userRole);
//        } else {
//            reqRoles.forEach(role -> {
//                switch (role.getName()) {
//                    case ROLE_ADMIN: {
//                        addRoles(ERole.ROLE_ADMIN, roles);
//                    }
//                    case ROLE_MANAGER: {
//                        addRoles(ERole.ROLE_MANAGER, roles);
//                    }
//                    case ROLE_LECTURE: {
//                        addRoles(ERole.ROLE_LECTURE, roles);
//                    }
//                    default:{
//                        addRoles(ERole.ROLE_STUDENT, roles);
//                    }
//                }
//
//            });
//        }
//
//        newUser.setRoles(roles);
        userService.createUser(user);
        return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "User created successfully!", user));
    }

    public void addRoles(ERole roleName, Set<Role> roles) {
        Role userRole = roleService.findByName(roleName).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        roles.add(userRole);
    }






}