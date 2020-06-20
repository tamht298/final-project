package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.UserExport;
import com.thanhtam.backend.entity.Intake;
import com.thanhtam.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Optional;

public interface UserService {
    //    List<User> getAllUsers();
//    List<User> findAllUsersByPage(Integer pageNumber, Integer pageSize, String sortBy);
    Optional<User> getUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Page<User> findUsersByPage(Pageable pageable);

    Page<User> findUsersDeletedByPage(Pageable pageable, boolean deleted);

    Page<User> findAllByDeletedAndUsernameContains(boolean deleted, String username, Pageable pageable);


    User createUser(User user);

    Optional<User> findUserById(Long id);

    List<UserExport> findAllByDeletedToExport(boolean statusDelete);

    void updateUser(User user);

    List<User> findAllByIntake(Intake intake);

}
