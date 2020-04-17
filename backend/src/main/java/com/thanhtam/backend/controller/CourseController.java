package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class CourseController {
    private CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @GetMapping(value = "/courses")
    public ResponseEntity<ServiceResult> getAllCourse() {
        List<Course> courseList = courseService.getCourseList();
        if (courseList.size() == 0) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NO_CONTENT.value(), "List is empty", null));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get list of course successfully!", courseList));

    }


    @GetMapping(value = "/courses/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseService.getCourseById(id);
        if (!course.isPresent()) {
            throw new EntityNotFoundException("Not found with course id: " + id);

        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get course with id: " + id, course));
    }

    @PostMapping(value = "/courses")
    public ResponseEntity<Object> createCourse(@Valid @RequestBody Course course) {
        try {
            if (!courseService.existsByCode(course.getCourseCode())) {
                courseService.saveCourse(course);
                return ResponseEntity.ok().body(new ServiceResult(HttpStatus.CREATED.value(), "Created course successfully!", course));

            } else{
                return ResponseEntity.badRequest().body(new ServiceResult(HttpStatus.CONFLICT.value(), "Duplicate Course!", course.getCourseCode()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.toString());
        }


    }

    @PutMapping(value = "/courses/{id}")
    public ResponseEntity<?> updateCourse(@Valid @RequestBody Course course, @PathVariable Long id) {
        Optional<Course> updateCourse = courseService.getCourseById(id);
        if (!updateCourse.isPresent()) {
            throw new EntityNotFoundException("Not found with course id: " + id + " successfully!");
        }
        course.setId(id);
        courseService.saveCourse(course);
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Update course with id: " + id, course));
    }

    @DeleteMapping(value = "/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        Optional<Course> courseOptional = courseService.getCourseById(id);
        if (!courseOptional.isPresent()) {
            throw new EntityNotFoundException("Not found with course id:" + id + " successfully!");
        }
        courseService.delete(id);
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NO_CONTENT.value(), "Deleted course with id: " + id + " successfully!", null));
    }
}
