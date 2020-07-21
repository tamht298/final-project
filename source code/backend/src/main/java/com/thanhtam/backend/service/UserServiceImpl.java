package com.thanhtam.backend.service;

import com.thanhtam.backend.config.JwtUtils;
import com.thanhtam.backend.dto.UserExport;
import com.thanhtam.backend.entity.PasswordResetToken;
import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.PasswordResetTokenRepository;
import com.thanhtam.backend.repository.UserRepository;
import com.thanhtam.backend.ultilities.ERole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.*;


@Service(value = "userService")
public class UserServiceImpl implements UserService {
private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private RoleService roleService;
    private PasswordEncoder passwordEncoder;
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private EmailService emailService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder, PasswordResetTokenRepository passwordResetTokenRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }


    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public String getUserName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return username;
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

                    case ROLE_LECTURER: {
                        addRoles(ERole.ROLE_LECTURER, roles);
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
    public List<User> findAllByIntakeId(Long id) {
        return userRepository.findAllByIntakeId(id);
    }

    @Override
    public boolean requestPasswordReset(String email) throws MessagingException {
        boolean returnValue = false;
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            return false;
        }
        String token = new JwtUtils().generatePasswordResetToken(user.get().getId());
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user.get());

        passwordResetTokenRepository.save(passwordResetToken);
        emailService.resetPassword(email, token);
        return true;
    }

    @Override
    public boolean resetPassword(String token, String password) {
        boolean returnValue = false;
        logger.error(token);
        if (new JwtUtils().hasTokenExpired(token)) {
            return false;
        }
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            return false;
        }

//        Prepare a new password
        String encodedPassword = passwordEncoder.encode(password);

//        Update user password into database
        User user = passwordResetToken.getUser();
        user.setPassword(encodedPassword);
        User userSave = userRepository.save(user);

//        verify if password was saved
        if(userSave !=null && userSave.getPassword().equalsIgnoreCase(encodedPassword)){
            returnValue = true;
        }
        passwordResetTokenRepository.delete(passwordResetToken);
        return returnValue;
    }

    @Override
    public Page<User> findAllByUsernameContainsOrEmailContains(String username, String email, Pageable pageable) {
        return userRepository.findAllByUsernameContainsOrEmailContains(username, email, pageable);
    }

    public void addRoles(ERole roleName, Set<Role> roles) {
        Role userRole = roleService.findByName(roleName).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        roles.add(userRole);
    }

}
