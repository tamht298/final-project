package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ExamDto;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.*;
import com.thanhtam.backend.service.ExamService;
import com.thanhtam.backend.service.IntakeService;
import com.thanhtam.backend.service.QuestionService;
import com.thanhtam.backend.service.UserService;
import io.swagger.models.auth.In;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class ExamController {
    Logger logger = LoggerFactory.getLogger(ExamController.class);

    private ExamService examService;
    private QuestionService questionService;
    private UserService userService;
    private IntakeService intakeService;

    @Autowired
    public ExamController(ExamService examService, QuestionService questionService, UserService userService, IntakeService intakeService) {

        this.examService = examService;
        this.questionService = questionService;
        this.userService = userService;
        this.intakeService = intakeService;
    }

    @GetMapping(value = "/exams")
    public ResponseEntity<List<Exam>> getAll() {
        List<Exam> exams = examService.getAll();
        if (exams.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @PostMapping(value = "/exams")
    public ResponseEntity<?> createExam(@Valid @RequestBody ExamDto examDto, @RequestParam String intakeCode) {
        try {
            Intake intake = intakeService.findByCode(intakeCode);
            List<User> users = userService.findAllByIntake(intake);
            Exam exam = new Exam();
            exam = examDto.getExam();
            exam.setUsers(users);
            examService.saveExam(exam);
            logger.info(String.valueOf(examDto));
            examService.saveExam(exam);
            Long examId = exam.getId();
            Set<ExamQuestion> examQuestions = new HashSet<>();
            //            set examId in exam_question table
            List<ExamQuestionPoint> examQuestionPoints = examDto.getExamQuestionPoints();
            //            using for in questions
            for (ExamQuestionPoint examQuestionPoint : examQuestionPoints) {
                ExamQuestion examQuestion = new ExamQuestion();
                examQuestion.setExam(exam);
                Question question = questionService.getQuestionById(examQuestionPoint.getQuestionId()).get();
                //            set questionId in exam_question table
                //            add question_id and point
                examQuestion.setQuestion(question);
                examQuestion.setPoint(examQuestionPoint.getPoint());
//                add new examQuestion to list
                examQuestions.add(examQuestion);
                //            end for loop
            }
//            set list to exam entity
            exam.setQuestions(examQuestions);
//            save exam
            examService.saveExam(exam);
            return ResponseEntity.ok(new ServiceResult(HttpStatus.OK.value(), "created exam successfully!", exam));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

//    @PatchMapping(value="/exams/{examId}/join/users")
//    public List<User> addUserListToExam(@Valid @RequestBody List<User> users, @PathVariable Long examId){
//        Exam exam = this.examService.getExamById(examId).get();
//        exam.setId(examId);
//        exam.setUsers(users);
//        this.examService.
//
//    }

    @GetMapping(value = "/exams/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable("id") Long id) {
        Optional<Exam> exam = examService.getExamById(id);
        if (!exam.isPresent()) {
            return new ResponseEntity<>(exam.get(),
                    HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exam.get(), HttpStatus.OK);
    }
}
