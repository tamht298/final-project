package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String s);

    boolean existsById(Long id);

    Page<Course> findAll(Pageable pageable);
}
