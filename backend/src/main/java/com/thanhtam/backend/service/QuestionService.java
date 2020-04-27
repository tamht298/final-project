package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Optional<Question> getQuestionById(Long id);
    List<Question> getQuestionByCourse(Course course);
    List<Question> getQuestionByQuestionType(QuestionType questionType);
    List<Question> getQuestionList();
    void save(Question question);
    void delete(Long id);

}
