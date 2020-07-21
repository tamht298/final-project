package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IntakeRepository extends JpaRepository<Intake, Long> {
    Optional<Intake> findByIntakeCode(String intakeCode);

}
