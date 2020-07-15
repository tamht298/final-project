package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.PageResult;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.service.CourseService;
import com.thanhtam.backend.service.PartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
@Slf4j
public class PartController {
    private PartService partService;
    private CourseService courseService;

    @Autowired
    public PartController(PartService partService, CourseService courseService) {
        this.partService = partService;
        this.courseService = courseService;
    }

    @GetMapping(value = "/courses/{courseId}/parts")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public PageResult getPartListByCourse(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable, @PathVariable Long courseId) {
        Page<Part> parts = partService.getPartLisByCourse(pageable, courseId);
        return new PageResult(parts);
    }

    @GetMapping(value = "/courses/{courseId}/part-list")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public List<Part> getPartListByCourse(@PathVariable Long courseId) {
        Course course = courseService.getCourseById(courseId).get();
        List<Part> parts = partService.getPartListByCourse(course);
        return parts;
    }

    @GetMapping(value = "/parts/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public ResponseEntity<?> getPartById(@PathVariable Long id) {
        Optional<Part> part = partService.findPartById(id);
        if (!part.isPresent()) {
            throw new EntityNotFoundException("Not found with part id: " + id);

        }
        return ResponseEntity.ok().body(part);
    }

    @PatchMapping(value = "/parts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePartName(@PathVariable Long id, @Valid @RequestBody String name) {
        Part part = partService.findPartById(id).get();
        part.setName(name);
        partService.savePart(part);
        return ResponseEntity.ok().body(part);
    }

    @PostMapping(value = "/courses/{courseId}/parts")
    public void createPartByCourse(@Valid @RequestBody Part part, @PathVariable Long courseId) {
        Course course = courseService.getCourseById(courseId).get();
        part.setCourse(course);
        partService.savePart(part);

    }

}
