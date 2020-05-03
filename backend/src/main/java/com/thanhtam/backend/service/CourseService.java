package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Optional<Course> getCourseById(Long id);

    List<Course> getCourseList();

    void saveCourse(Course course);

    void delete(Long id);

    boolean existsByCode(String code);

    boolean existsById(Long id);
}
