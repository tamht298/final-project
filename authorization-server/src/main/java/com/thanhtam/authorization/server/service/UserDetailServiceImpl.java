package com.thanhtam.authorization.server.service;

import com.thanhtam.authorization.server.entity.AuthUserDetail;
import com.thanhtam.authorization.server.entity.User;
import com.thanhtam.authorization.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("userDetailsService")
public class UserDetailServiceImpl implements UserDetailsService, UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {

        Optional<User> user = userRepo.findByUsername(name);
        user.orElseThrow(() -> new UsernameNotFoundException("Username or password wrong"));

        UserDetails userDetails = new AuthUserDetail(user.get());
        new AccountStatusUserDetailsChecker().check(userDetails);

        return userDetails;
    }

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }
}
