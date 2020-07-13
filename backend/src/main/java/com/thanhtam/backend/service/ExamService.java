package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.AnswerSheet;
import com.thanhtam.backend.dto.ChoiceList;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ExamService {

    Exam saveExam(Exam exam);

    Page<Exam> findAll(Pageable pageable);

    void cancelExam(Long id);

    List<Exam> getAll();

    Optional<Exam> getExamById(Long id);

    Page<Exam> findAllByCreatedBy_Username(Pageable pageable, String username);

    List<ChoiceList> getChoiceList(List<AnswerSheet> userChoices, List<ExamQuestionPoint> examQuestionPoints);
}
