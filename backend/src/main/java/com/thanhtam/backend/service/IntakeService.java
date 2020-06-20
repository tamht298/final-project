package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Intake;

import java.util.Optional;

public interface IntakeService {
    Intake findByCode(String code);
}
