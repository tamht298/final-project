package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.QuestionType;

import java.util.List;
import java.util.Optional;

public interface QuestionTypeService {
    Optional<QuestionType> getQuestionTypeById(Long id);

    List<QuestionType> getQuestionTypeList();

    void saveQuestionType(QuestionType questionType);

    void delete(Long id);

    boolean existsById(Long id);
}
