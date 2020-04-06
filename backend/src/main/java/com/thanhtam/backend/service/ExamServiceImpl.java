package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {

    private ExamRepository examRepository;

    @Autowired
    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getAll() {
        return examRepository.findAll();
    }
}
