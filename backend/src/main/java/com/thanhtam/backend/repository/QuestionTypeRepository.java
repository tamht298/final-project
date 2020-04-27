package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {
    boolean existsById(Long id);
}
