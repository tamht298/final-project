package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Exam;

import java.util.List;

public interface ExamService {

    Exam createExam(Exam exam);
    List<Exam> getAll();
}
