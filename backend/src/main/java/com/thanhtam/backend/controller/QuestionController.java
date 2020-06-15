package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.PageResult;
import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import com.thanhtam.backend.service.CourseService;
import com.thanhtam.backend.service.PartService;
import com.thanhtam.backend.service.QuestionService;
import com.thanhtam.backend.service.QuestionTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    private PartService partService;
    private QuestionTypeService questionTypeService;


    @Autowired
    public QuestionController(QuestionService questionService, PartService partService, QuestionTypeService questionTypeService) {
        this.questionService = questionService;
        this.partService = partService;
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

    //    Get list of question by part
    @GetMapping(value = "/parts/{partId}/questions")
    public PageResult getQuestionsByPart(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable, @PathVariable Long partId) {
//        if (partService.existsById(partId)) {
//            Part part = partService.findPartById(partId).get();
//            List<Question> questionList = questionService.getQuestionByPart(part);
//            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question list with course id: " + partId, questionList));
//        }
        Part part = partService.findPartById(partId).get();
        Page<Question> questions = questionService.findQuestionsByPart(pageable, part);
        return new PageResult(questions);

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
