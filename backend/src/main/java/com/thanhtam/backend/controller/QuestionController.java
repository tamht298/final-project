package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import com.thanhtam.backend.service.CourseService;
import com.thanhtam.backend.service.QuestionService;
import com.thanhtam.backend.service.QuestionTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
@RestController
@Slf4j
public class QuestionController {
    private QuestionService questionService;
    private CourseService courseService;
    private QuestionTypeService questionTypeService;


    @Autowired
    public QuestionController(QuestionService questionService, CourseService courseService, QuestionTypeService questionTypeService) {
        this.questionService = questionService;
        this.courseService = courseService;
        this.questionTypeService = questionTypeService;
    }

    @GetMapping(value = "/questions")
    public ResponseEntity<ServiceResult> getAllQuestion() {
        List<Question> questionList = questionService.getQuestionList();
        log.info(questionList.toString());
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question bank successfully!", questionList));
    }

    @GetMapping(value = "/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        Optional<Question> questionOptional = questionService.getQuestionById(id);
        if (!questionOptional.isPresent()) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question with id: " + id, questionOptional));
    }

    //    Get list of question by course
    @GetMapping(value = "/courses/{courseId}/questions")
    public ResponseEntity<?> getQuestionsByCourse(@PathVariable Long courseId) {
        if (courseService.existsById(courseId)) {
            Course course = courseService.getCourseById(courseId).get();
            List<Question> questionList = questionService.getQuestionByCourse(course);
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question list with course id: " + courseId, questionList));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with course id: " + courseId, null));

    }

//    Get list of question by question type

    @GetMapping(value = "/question-types/{typeId}/questions")
    public ResponseEntity<?> getQuestionByQuestionType(@PathVariable Long typeId) {
        if (questionTypeService.existsById(typeId)) {

            QuestionType questionType = questionTypeService.getQuestionTypeById(typeId).get();
            List<Question> questionList = questionService.getQuestionByQuestionType(questionType);
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question list with question type id: " + typeId, questionList));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found question type with id: " + typeId, null));
    }

    @PostMapping(value = "/questions")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody Question question) {
        questionService.save(question);
        Question questionCreated = questionService.getQuestionById(question.getId()).get();
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Created question successfully!", questionCreated));
    }

    @PutMapping(value = "/questions/{id}")
    public ResponseEntity<?> updateQuestion(@Valid @RequestBody Question question, @PathVariable Long id) {
        Optional<Question> questionReq = questionService.getQuestionById(id);
        if (!questionReq.isPresent()) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
        }
        question.setId(id);
        questionService.save(question);
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question with id: " + id, question));
    }


}
