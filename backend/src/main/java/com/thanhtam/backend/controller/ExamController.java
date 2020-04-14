package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.service.ExamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class ExamController {
    Logger logger = LoggerFactory.getLogger(ExamController.class);

    private ExamService examService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping(value = "/exams")
    public ResponseEntity<List<Exam>> getAll(){
        List<Exam> exams = examService.getAll();
        if (exams.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }
    @PostMapping(value = "/exams")
    public ResponseEntity<?> createExam(@Valid @RequestBody Exam exam) {
        try{
            examService.createExam(exam);
            logger.info(String.valueOf(exam));
            return ResponseEntity.ok(new ServiceResult( HttpStatus.OK.value(), "created exam succesfully!", exam));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }

    }

    @GetMapping(value="/exams/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable("id") Long id){
        Optional<Exam> exam = examService.getExamById(id);
        if (!exam.isPresent()) {
            return new ResponseEntity<>(exam.get(),
                    HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exam.get(), HttpStatus.OK);
    }
}
