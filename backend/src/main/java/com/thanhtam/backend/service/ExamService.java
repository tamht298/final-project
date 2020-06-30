package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.AnswerSheet;
import com.thanhtam.backend.dto.ChoiceList;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.entity.Exam;

import java.util.List;
import java.util.Optional;

public interface ExamService {

    Exam saveExam(Exam exam);

    List<Exam> getAll();

    Optional<Exam> getExamById(Long id);

    List<ChoiceList> getChoiceList(List<AnswerSheet> userChoices, List<ExamQuestionPoint> examQuestionPoints);
}
