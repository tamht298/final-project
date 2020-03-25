package com.thanhtam.authorization.server.service;

import com.thanhtam.authorization.server.entity.Profile;
import com.thanhtam.authorization.server.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {


    private ProfileRepo profileRepo;

    public ProfileServiceImpl(ProfileRepo profileRepo) {
        this.profileRepo = profileRepo;
    }

    @Override
    public List<Profile> findAll() {
        return profileRepo.findAll();
    }
}
