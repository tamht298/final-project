package com.thanhtam.backend.controller;

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.thanhtam.backend.dto.*;
import com.thanhtam.backend.entity.Profile;
import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.ExcelService;
import com.thanhtam.backend.service.FilesStorageService;
import com.thanhtam.backend.service.RoleService;
import com.thanhtam.backend.service.UserService;
import com.thanhtam.backend.ultilities.ERole;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.util.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api/users")
@Slf4j
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;
    private ExcelService excelService;
    FilesStorageService filesStorageService;

    @Autowired
    public UserController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder, ExcelService excelService, FilesStorageService filesStorageService) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.excelService = excelService;
        this.filesStorageService = filesStorageService;
    }

    @GetMapping(value = "/profile")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        Optional<User> user;
        if (username.isEmpty()) {
            user = userService.getUserByUsername(userService.getUserName());
        } else {
            user = userService.getUserByUsername(username);
        }
        if (!user.isPresent()) {
            return ResponseEntity.ok(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Tên đăng nhâp " + username + " không tìm thấy!", null));
        }
        return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "Lấy thông tin user " + username + " thành công!", user));
    }

    @GetMapping("/check-username")
    public boolean checkUsername(@RequestParam("value") String value) {
        return userService.existsByUsername(value);
    }

    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam("value") String value) {

        return userService.existsByEmail(value);
    }

    @PatchMapping("/{id}/email/updating")
    public ResponseEntity updateEmail(@Valid @RequestBody EmailUpdate data, @PathVariable Long id) {
        User user = userService.findUserById(id).get();
        boolean isPassword = passwordEncoder.matches(data.getPassword(), user.getPassword());
        log.error(String.valueOf("matching password? : " + isPassword));
        if (isPassword == false) {
            return ResponseEntity.ok(new ServiceResult(HttpStatus.EXPECTATION_FAILED.value(), "Password is wrong", null));
        }
        user.setEmail(data.getEmail());
        userService.updateUser(user);
        return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "Update email successfully", data.getEmail()));
    }

    @PatchMapping("/{id}/password/updating")
    public ResponseEntity updatePass(@Valid @RequestBody PasswordUpdate passwordUpdate, @PathVariable Long id) {
        try {
            log.error(passwordUpdate.toString());
            User user = userService.findUserById(id).get();
            if (passwordEncoder.matches(passwordUpdate.getCurrentPassword(), user.getPassword())) {
                if (!passwordUpdate.getCurrentPassword().equals(passwordUpdate.getNewPassword())) {
//                    OK
                    user.setPassword(passwordEncoder.encode(passwordUpdate.getNewPassword()));
                    userService.updateUser(user);
                    return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "Update password successfully", null));
                } else {
//                    New password is duplicated with current password
                    return ResponseEntity.ok(new ServiceResult(HttpStatus.CONFLICT.value(), "This is old password", null));
                }
            } else {
//                Password is wrong
                return ResponseEntity.ok(new ServiceResult(HttpStatus.BAD_REQUEST.value(), "Wrong password, please check again!", null));
            }

        } catch (Exception e) {
            return ResponseEntity.ok(new ServiceResult(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null));
        }
    }

    @GetMapping("/{id}/check-email")
    public boolean checkExistsEmailUpdate(@RequestParam("value") String value, @PathVariable Long id) {
        if (userService.existsByEmail(value)) {
//            This is my email
            if (userService.findUserById(id).get().getEmail().equals(value)) {
                return false;
            }
            return true;
        }
        return false;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/deleted/{deleted}")
    public ResponseEntity<?> deleteTempUser(@PathVariable Long id, @PathVariable boolean deleted) {
        User user = userService.findUserById(id).get();
        user.setDeleted(deleted);
        userService.updateUser(user);
        return ResponseEntity.noContent().build();
    }


    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public PageResult getUsersByPage(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable) {
        Page<User> userPage = userService.findUsersByPage(pageable);
        return new PageResult(userPage);
    }

//    @GetMapping("/deleted/{status}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public PageResult getUsersByPage(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable) {
//        Page<User> userPage = userService.findUsersByPage(pageable);
//        return new PageResult(userPage);
//    }

    @GetMapping("/search")
    public PageResult searchUsersByUsernameOrEmail(@RequestParam(value = "search-keyword") String info, @PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable) {
        LOGGER.error("check search");
        Page<User> userPage = userService.findAllByUsernameContainsOrEmailContains(info, info, pageable);
        LOGGER.error(userPage.toString());
        return new PageResult(userPage);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdate userReq, @PathVariable Long id) {
        User userUpdate = userService.findUserById(id).get();
        if (userReq.getPassword() != null) {
            userUpdate.setPassword(passwordEncoder.encode(userReq.getPassword()));
        }
        userUpdate.setEmail(userReq.getEmail());
        Profile profile = userReq.getProfile();
        profile.setId(userUpdate.getProfile().getId());
        profile.setFirstName(userReq.getProfile().getFirstName());
        profile.setLastName(userReq.getProfile().getLastName());
        userUpdate.setProfile(profile);
        userService.updateUser(userUpdate);
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Cập nhật thành công!", userUpdate));

    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

//        Check username is exists?
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(new ServiceResult(HttpStatus.CONFLICT.value(), "Tên đăng nhập đã có người sử dụng!", ""));

        }
//        Check email is exists?
        if (userService.existsByEmail(user.getEmail())) {
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

    @GetMapping("deleted/{status}/export/users.csv")
    public void exportUsersToCSV(HttpServletResponse response) throws Exception {
        String fileName = "users.csv";
        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
        //create a csv writer
        StatefulBeanToCsv<UserExport> writer = new StatefulBeanToCsvBuilder<UserExport>(response.getWriter())
                .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
                .withOrderedResults(false)
                .build();

        //write all users to csv file'
        writer.write(userService.findAllByDeletedToExport(false));
    }

    public void addRoles(ERole roleName, Set<Role> roles) {
        Role userRole = roleService.findByName(roleName).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        roles.add(userRole);
    }


}   
