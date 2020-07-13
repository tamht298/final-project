package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.AnswerSheet;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Optional<Question> getQuestionById(Long id);

    List<Question> getQuestionByPart(Part part);

    List<Question> getQuestionByQuestionType(QuestionType questionType);

    List<Question> getQuestionPointList(List<ExamQuestionPoint> examQuestionPoints);

    List<AnswerSheet> convertFromQuestionList(List<Question> questionList);

    List<Question> getQuestionList();

    Page<Question> findQuestionsByPart(Pageable pageable, Part part);

    Page<Question> findQuestionsByPartAndDeletedFalse(Pageable pageable, Part part);
    Page<Question> findQuestionsByPart_IdAndCreatedBy_UsernameAndDeletedFalse(Pageable pageable, Long partId, String username);

    Page<Question> findAllQuestions(Pageable pageable);

    String findQuestionTextById(Long questionId);

    Page<Question> findQuestionsByPart_IdAndCreatedBy_Username(Pageable pageable, Long partId, String username);

    Page<Question> findQuestionsByCreatedBy_Username(Pageable pageable, String username);

    void save(Question question);

    void update(Question question);

    void delete(Long id);

}
