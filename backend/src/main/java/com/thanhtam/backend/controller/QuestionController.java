package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.PageResult;
import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.*;
import com.thanhtam.backend.service.*;
import com.thanhtam.backend.ultilities.EQTypeCode;
import com.thanhtam.backend.ultilities.ERole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private UserService userService;
    private RoleService roleService;

    @Autowired
    public QuestionController(QuestionService questionService, PartService partService, QuestionTypeService questionTypeService, UserService userService, RoleService roleService) {
        this.questionService = questionService;
        this.partService = partService;
        this.questionTypeService = questionTypeService;
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/questions")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")

    public ResponseEntity<ServiceResult> getAllQuestion() {
        List<Question> questionList = questionService.getQuestionList();
        log.info(questionList.toString());
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question bank successfully!", questionList));
    }

    @GetMapping(value = "/questions/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")

    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        Optional<Question> questionOptional = questionService.getQuestionById(id);
        if (!questionOptional.isPresent()) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
        }
        return ResponseEntity.ok().body(questionOptional.get());
    }

    //    Get list of question by part
    @GetMapping(value = "/parts/{partId}/questions")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public PageResult getQuestionsByPart(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable, @PathVariable Long partId) {
        String username = userService.getUserName();
        User user = userService.getUserByUsername(username).get();
        Role role = roleService.findByName(ERole.ROLE_ADMIN).get();
        boolean isAdmin = user.getRoles().contains(role);

        Page<Question> questions;
        if (partId == 0) {
            if(isAdmin){
                questions = questionService.findAllQuestions(pageable);
                return new PageResult(questions);
            }
            questions = questionService.findQuestionsByCreatedBy_Username(pageable, username);
            return new PageResult(questions);

        }

        if (isAdmin) {
            Part part = partService.findPartById(partId).get();
            questions = questionService.findQuestionsByPart(pageable, part);
            return new PageResult(questions);
        }
        questions = questionService.findQuestionsByPart_IdAndCreatedBy_Username(pageable, partId, username);
        return new PageResult(questions);

    }

    @GetMapping(value = "/parts/{partId}/questions/false/deleted")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public PageResult getQuestionsByPartNotDeleted(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable, @PathVariable Long partId) {
        String username = userService.getUserName();
        User user = userService.getUserByUsername(username).get();
        Role role = roleService.findByName(ERole.ROLE_ADMIN).get();
        boolean isAdmin = user.getRoles().contains(role);
        Page<Question> questions;
        if (isAdmin) {
            Part part = partService.findPartById(partId).get();
            questions = questionService.findQuestionsByPartAndDeletedFalse(pageable, part);
            return new PageResult(questions);
        }
        questions = questionService.findQuestionsByPart_IdAndCreatedBy_UsernameAndDeletedFalse(pageable, partId, username);
        return new PageResult(questions);
    }

//    Get list of question by question type

    @GetMapping(value = "/question-types/{typeId}/questions")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")

    public ResponseEntity<?> getQuestionByQuestionType(@PathVariable Long typeId) {
        if (questionTypeService.existsById(typeId)) {

            QuestionType questionType = questionTypeService.getQuestionTypeById(typeId).get();
            List<Question> questionList = questionService.getQuestionByQuestionType(questionType);
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question list with question type id: " + typeId, questionList));
        }
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found question type with id: " + typeId, null));
    }

    @PostMapping(value = "/questions")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public Question createQuestion(@Valid @RequestBody Question question, @RequestParam String questionType, @RequestParam Long partId) {
        EQTypeCode eqTypeCode = EQTypeCode.valueOf(questionType);
        QuestionType questionType1 = questionTypeService.getQuestionTypeByCode(eqTypeCode).get();
        Part part = partService.findPartById(partId).get();

        question.setQuestionType(questionType1);
        question.setPart(part);
        question.setDeleted(false);
        questionService.save(question);
        Question questionCreated = questionService.getQuestionById(question.getId()).get();
        log.info(questionCreated.toString());
        return questionCreated;
    }

    @PutMapping(value = "/questions/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")

    public ResponseEntity<?> updateQuestion(@Valid @RequestBody Question question, @PathVariable Long id) {
        Optional<Question> questionReq = questionService.getQuestionById(id);
        if (!questionReq.isPresent()) {
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
        }
        question.setId(id);
        questionService.save(question);
        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Get question with id: " + id, question));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    @GetMapping(value = "/questions/{id}/deleted/{deleted}")
    public ResponseEntity<?> deleteTempQuestion(@PathVariable Long id, @PathVariable boolean deleted) {
        log.error("Deleted");
        Question question = questionService.getQuestionById(id).get();
        question.setDeleted(deleted);
        questionService.update(question);
        return ResponseEntity.noContent().build();
    }

}
