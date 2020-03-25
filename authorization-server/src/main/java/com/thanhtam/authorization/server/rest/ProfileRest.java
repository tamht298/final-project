package com.thanhtam.authorization.server.rest;

import com.thanhtam.authorization.server.entity.Profile;
import com.thanhtam.authorization.server.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api")
public class ProfileRest {
    @Autowired
    private ProfileService profileService;

    @GetMapping(value = "/profiles")
    public List<Profile> findAll(){
      return profileService.findAll();
    }

}
