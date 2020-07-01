package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByPart(Part part);

    List<Question> findByQuestionType(QuestionType questionType);

    Page<Question> findQuestionsByPart(Pageable pageable, Part part);
    Page<Question> findAll(Pageable pageable);

    @Query(value="select q.id from question q where q.id =:questionId", nativeQuery=true)
    String findQuestionTextById(Long questionId);
}
