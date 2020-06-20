package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.UserExport;
import com.thanhtam.backend.entity.Intake;
import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.UserRepository;
import com.thanhtam.backend.ultilities.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleService roleService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Page<User> findUsersByPage(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> findUsersDeletedByPage(Pageable pageable, boolean deleted) {
        return userRepository.findAllByDeleted(deleted, pageable);
    }

    @Override
    public Page<User> findAllByDeletedAndUsernameContains(boolean deleted, String username, Pageable pageable) {
        return userRepository.findAllByDeletedAndUsernameContains(deleted, username, pageable);
    }

    @Override
    public User createUser(User user) {
//        Create new user
        User newUser = new User(user.getUsername(), passwordEncoder.encode(user.getUsername()), user.getEmail(), user.getProfile());

        Set<Role> reqRoles = user.getRoles();
        Set<Role> roles = new HashSet<>();

        if (reqRoles == null) {
            Role userRole = roleService.findByName(ERole.ROLE_STUDENT).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            reqRoles.forEach(role -> {
                switch (role.getName()) {
                    case ROLE_ADMIN: {
                        addRoles(ERole.ROLE_ADMIN, roles);
                    }
                    case ROLE_MANAGER: {
                        addRoles(ERole.ROLE_MANAGER, roles);
                    }
                    case ROLE_LECTURE: {
                        addRoles(ERole.ROLE_LECTURE, roles);
                    }
                    default: {
                        addRoles(ERole.ROLE_STUDENT, roles);
                    }
                }

            });
        }

        newUser.setRoles(roles);
        return userRepository.save(newUser);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<UserExport> findAllByDeletedToExport(boolean statusDelete) {
        List<User> userList = userRepository.findAllByDeleted(statusDelete);
        List<UserExport> userExportList = new ArrayList<>();
        userList.forEach(user -> {
            userExportList.add(new UserExport(user.getUsername(), user.getEmail(), user.getProfile().getFirstName(), user.getProfile().getLastName()));
        });
        return userExportList;
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> findAllByIntake(Intake intake) {
        return userRepository.findAllByIntake(intake);
    }

    public void addRoles(ERole roleName, Set<Role> roles) {
        Role userRole = roleService.findByName(roleName).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        roles.add(userRole);
    }

}
