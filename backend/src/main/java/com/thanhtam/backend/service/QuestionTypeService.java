package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.QuestionType;
import com.thanhtam.backend.ultilities.EQTypeCode;

import java.util.List;
import java.util.Optional;

public interface QuestionTypeService {
    Optional<QuestionType> getQuestionTypeById(Long id);

    Optional<QuestionType> getQuestionTypeByCode(EQTypeCode code);

    List<QuestionType> getQuestionTypeList();

    void saveQuestionType(QuestionType questionType);

    void delete(Long id);

    boolean existsById(Long id);
}
