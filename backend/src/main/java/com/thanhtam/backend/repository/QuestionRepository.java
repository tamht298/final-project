package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCourse(Course course);

    List<Question> findByQuestionType(QuestionType questionType);
}
