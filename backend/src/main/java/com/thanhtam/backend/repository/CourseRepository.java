package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String s);

    boolean existsById(Long id);
}
