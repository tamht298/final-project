package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findAllByPart_Course_Id(Long courseId);
List<Exam> findByCanceledIsTrueOrderByCreatedDateDesc();
    public Page<Exam> findAll(Pageable pageable);
    public Page<Exam> findAllByCreatedBy_Username(Pageable pageable, String username);
    @Transactional
    @Modifying
    @Query(value = "UPDATE exam set exam.canceled=true where exam.id=?" , nativeQuery = true)
    void cancelExam(Long id);

}
