package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Profile;

import java.util.List;

public interface ProfileService {
    Profile createProfile(Profile profile);

    List<Profile> getAllProfiles();
}
