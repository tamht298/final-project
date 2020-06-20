package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Intake;
import com.thanhtam.backend.repository.IntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IntakeServiceImpl implements IntakeService {
    private IntakeRepository intakeRepository;

    @Autowired
    public IntakeServiceImpl(IntakeRepository intakeRepository) {
        this.intakeRepository = intakeRepository;
    }

    @Override
    public Intake findByCode(String code) {
        Optional<Intake> intakeOptional = intakeRepository.findByIntakeCode(code);
        return intakeOptional.get();
    }
}
