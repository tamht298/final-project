package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.QuestionType;
import com.thanhtam.backend.service.QuestionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
@RestController
public class QuestionTypeController {
    private QuestionTypeService questionTypeService;

    @Autowired
    public QuestionTypeController(QuestionTypeService questionTypeService) {
        this.questionTypeService = questionTypeService;
    }
    @GetMapping(value = "/question-types")
    public ResponseEntity<ServiceResult> getAllQuestionType() {
        List<QuestionType> questionTypeList = questionTypeService.getQuestionTypeList();
        if (questionTypeList.size() == 0) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NO_CONTENT.value(), "List is empty", null));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get list of course successfully!", questionTypeList));

    }

    @GetMapping(value = "/question-types/{id}")
    public ResponseEntity<?> getQuestionTypeById(@PathVariable Long id) {
        Optional<QuestionType> questionType = questionTypeService.getQuestionTypeById(id);
        if (!questionType.isPresent()) {
            throw new EntityNotFoundException("Not found with course id: " + id);

        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question type id: "+id, questionType));
    }

//    @PostMapping(value = "/question-types")
//    public ResponseEntity<Object> createQuestionType(@Valid @RequestBody QuestionType questionType) {
//        try {
//            questionTypeService.saveQuestionType(questionType);
//            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.CREATED.value(), "Created question type successfully!", questionType));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.toString());
//        }
//
//
//    }
//
//    @PutMapping(value = "/question-types/{id}")
//    public ResponseEntity<?> updateCourse(@Valid @RequestBody QuestionType questionType, @PathVariable Long id) {
//        Optional<QuestionType> questionTypeOptional = questionTypeService.getQuestionTypeById(id);
//        if (!questionTypeOptional.isPresent()) {
//            throw new EntityNotFoundException("Not found with question type id: " + id + " successfully!");
//        }
//        questionType.setId(id);
//        questionTypeService.saveQuestionType(questionType);
//        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Update question type with id: " + id, questionType));
//    }
//
//    @DeleteMapping(value = "/question-types/{id}")
//    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
//        Optional<QuestionType> questionTypeOptional = questionTypeService.getQuestionTypeById(id);
//        if (!questionTypeOptional.isPresent()) {
//            throw new EntityNotFoundException("Not found with question type id:" + id + " successfully!");
//        }
//        questionTypeService.delete(id);
//        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NO_CONTENT.value(), "Deleted question type with id: " + id + " successfully!", null));
//    }
}
