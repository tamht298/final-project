package com.thanhtam.backend.controller;

import com.thanhtam.backend.config.JwtUtils;
import com.thanhtam.backend.dto.LoginUser;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.exception.ErrorMessage;
import com.thanhtam.backend.payload.response.JwtResponse;
import com.thanhtam.backend.service.UserDetailsImpl;
import com.thanhtam.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    JwtUtils jwtUtils;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    @Autowired
    public AuthenticationController(JwtUtils jwtUtils, AuthenticationManager authenticationManager, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/signin")
    @Transactional
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginUser loginUser) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        User userLog = userService.getUserByUsername(userDetails.getUsername()).get();
        userLog.setLastLoginDate(new Date());
        userService.updateUser(userLog);
        logger.warn(userLog.toString());
        if(userLog.isDeleted() == true){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }


    @PostMapping(value="/password-reset-request")
    public ResponseEntity resetRequest(@RequestBody String email){

    }
}
