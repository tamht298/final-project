package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Exam;

import java.util.List;
import java.util.Optional;

public interface ExamService {

    Exam createExam(Exam exam);

    List<Exam> getAll();

    Optional<Exam> getExamById(Long id);
}
