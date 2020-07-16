package com.thanhtam.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.thanhtam.backend.dto.*;
import com.thanhtam.backend.entity.*;
import com.thanhtam.backend.service.*;
import com.thanhtam.backend.ultilities.ERole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import javax.xml.transform.Result;
import java.io.IOException;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class ExamController {
    Logger logger = LoggerFactory.getLogger(ExamController.class);

    private ExamService examService;
    private QuestionService questionService;
    private UserService userService;
    private IntakeService intakeService;
    private PartService partService;
    private ExamUserService examUserService;
    private ObjectMapper mapper;

    @Autowired
    public ExamController(ExamService examService, QuestionService questionService, UserService userService, IntakeService intakeService, PartService partService, ExamUserService examUserService, ObjectMapper mapper) {
        this.examService = examService;
        this.questionService = questionService;
        this.userService = userService;
        this.intakeService = intakeService;
        this.partService = partService;
        this.examUserService = examUserService;
        this.mapper = mapper;
    }

//    @GetMapping(value = "/exams")
//    public ResponseEntity<List<Exam>> getAll() {
//        List<Exam> exams = examService.getAll();
//        if (exams.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(exams, HttpStatus.OK);
//    }

    @GetMapping(value = "/exams")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public PageResult getExamsByPage(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable) {
        String username = userService.getUserName();
        User user = userService.getUserByUsername(username).get();
        boolean isAdmin = user.getRoles().contains(ERole.ROLE_ADMIN);
        Page<Exam> examPage;
        if (isAdmin) {
            examPage = examService.findAll(pageable);
            return new PageResult(examPage);
        }
        examPage = examService.findAllByCreatedBy_Username(pageable, username);
        return new PageResult(examPage);

    }

    @GetMapping(value = "/exams/list-all-by-user")
    public ResponseEntity<List<ExamUser>> getAllByUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        logger.error(username);

        List<ExamUser> examUserList = examUserService.getExamListByUsername(username);
        Date currentDate = new Date();
        examUserList.forEach(examUser -> {
            if (currentDate.compareTo(examUser.getExam().getBeginExam()) < 0) {
                examUser.getExam().setLocked(false);
            } else {
                examUser.getExam().setLocked(true);

            }
        });
        return new ResponseEntity(examUserList, HttpStatus.OK);

    }

    @GetMapping(value = "/exams/exam-user/{examId}")
    public ResponseEntity<ExamUser> getExamUserById(@PathVariable Long examId) throws ParseException {

        String username = userService.getUserName();
        Optional<ExamUser> examUser = Optional.ofNullable(examUserService.findByExamAndUser(examId, username));
        if (!examUser.isPresent()) {
            return new ResponseEntity("Không tìm thấy exam user này", HttpStatus.NOT_FOUND);
        }
        Date timeExam = examUser.get().getExam().getBeginExam();
        Date now = new Date();

//        if (examUser.get().getIsFinished().equals(false) && now.compareTo(timeExam) > 0) {
//            examUser.get().setIsFinished(true);
//            examUser.get().setTimeFinish(timeExam);
//        }
        return ResponseEntity.ok(examUser.get());
    }

    @GetMapping(value = "/exams/{examId}/questions")
    public ResponseEntity<ExamQuestionList> getAllQuestions(@PathVariable Long examId) throws IOException {
        String username = userService.getUserName();
        ExamQuestionList examQuestionList = new ExamQuestionList();
        Optional<Exam> exam = examService.getExamById(examId);
        if (!exam.isPresent()) {
            return new ResponseEntity("Không tìm thấy exam này", HttpStatus.NOT_FOUND);
        }
        Date currentTime = new Date();
        if (exam.get().isLocked() == true || exam.get().getBeginExam().compareTo(currentTime) > 0) {
            return new ResponseEntity("Bài thi đang bị khoá hoặc chưa tới thời gian phù hợp", HttpStatus.BAD_REQUEST);
        }
        ExamUser examUser = examUserService.findByExamAndUser(examId, username);
        examQuestionList.setRemainingTime(examUser.getRemainingTime());
        if (examUser.getIsStarted().equals(true)) {
//            Get answersheet
            //            Convert question data json to array object

            List<AnswerSheet> choiceUsers = convertAnswerJsonToObject(examUser);

            List<Question> questions1 = new ArrayList<>();
            choiceUsers.forEach(answerSheet1 -> {
                Question question = questionService.getQuestionById(answerSheet1.getQuestionId()).get();
                question.setChoices(answerSheet1.getChoices());
                question.setPoint(answerSheet1.getPoint());
                questions1.add(question);
            });

            examQuestionList.setQuestions(questions1);
            examQuestionList.setExam(exam.get());
            logger.error("case 1");
        } else if (exam.get().isShuffle() == true) {
            ObjectMapper mapper = new ObjectMapper();
            String answerSheet = exam.get().getQuestionData();
            List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(answerSheet, new TypeReference<List<ExamQuestionPoint>>() {
            });
            Collections.shuffle(examQuestionPoints);
//            save to answer sheet
            List<Question> questions = questionService.getQuestionPointList(examQuestionPoints);
            List<AnswerSheet> answerSheets = questionService.convertFromQuestionList(questions);
            //            Convert answer sheet to json
            String answerSheetConvertToJson = mapper.writeValueAsString(answerSheets);
            examUser.setAnswerSheet(answerSheetConvertToJson);
            examQuestionList.setExam(exam.get());
            examUser.setIsStarted(true);
            examUserService.update(examUser);

            List<Question> questions1 = new ArrayList<>();
            answerSheets.forEach(answerSheet1 -> {
                Question question = questionService.getQuestionById(answerSheet1.getQuestionId()).get();
                question.setChoices(answerSheet1.getChoices());
                question.setPoint(answerSheet1.getPoint());
                questions1.add(question);
            });
            examQuestionList.setQuestions(questions1);
            examUser.setTimeStart(new Date());
            examUserService.update(examUser);
            logger.error("case 2");

        } else {
            //            save to answer sheet
//            convert question json to object list
            ObjectMapper mapper = new ObjectMapper();
            String answerSheet = exam.get().getQuestionData();
            List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(answerSheet, new TypeReference<List<ExamQuestionPoint>>() {
            });

            List<Question> questions = questionService.getQuestionPointList(examQuestionPoints);
            List<AnswerSheet> answerSheets = questionService.convertFromQuestionList(questions);
//            Convert answer sheet to json
            String answerSheetConvertToJson = mapper.writeValueAsString(answerSheets);
            examUser.setAnswerSheet(answerSheetConvertToJson);
            examUser.setIsStarted(true);
            examUser.setTimeStart(new Date());
            examUserService.update(examUser);
            List<Question> questions1 = new ArrayList<>();
            answerSheets.forEach(answerSheet1 -> {
                Question question = questionService.getQuestionById(answerSheet1.getQuestionId()).get();
                question.setChoices(answerSheet1.getChoices());
                question.setPoint(answerSheet1.getPoint());
                questions1.add(question);
            });
            examQuestionList.setQuestions(questions1);
            examQuestionList.setExam(exam.get());
            logger.error("case 3");

        }
        return new ResponseEntity(examQuestionList, HttpStatus.OK);

    }

    @PostMapping(value = "/exams")
    public ResponseEntity<?> createExam(@Valid @RequestBody Exam exam, @RequestParam Long intakeId, @RequestParam Long partId, @RequestParam boolean isShuffle, boolean locked) {
        try {
            String username = userService.getUserName();
            User user = userService.getUserByUsername(username).get();
            Optional<Intake> intake = intakeService.findById(intakeId);
            if (intake.isPresent()) {
                exam.setIntake(intake.get());
            }
            Optional<Part> part = partService.findPartById(partId);
            if (part.isPresent()) {
                exam.setPart(part.get());
            }
            exam.setCreatedBy(user);
            exam.setShuffle(isShuffle);
            exam.setCanceled(false);
            logger.error("begin: " + exam.getBeginExam());

            this.examService.saveExam(exam);
            List<User> users = userService.findAllByIntakeId(intakeId);
            examUserService.create(exam, users);

//            Convert question data json to array object
            ObjectMapper mapper = new ObjectMapper();
            String questionJson = exam.getQuestionData();
            List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(questionJson, new TypeReference<List<ExamQuestionPoint>>() {
            });

            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }


    @GetMapping(value = "/exams/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable("id") Long id) {
        Optional<Exam> exam = examService.getExamById(id);
        if (!exam.isPresent()) {
            return new ResponseEntity<>(exam.get(),
                    HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exam.get(), HttpStatus.OK);
    }

    @PutMapping(value = "/exams/{examId}/questions-by-user")
    public void saveUserExamAnswer(@RequestBody List<AnswerSheet> answerSheets, @PathVariable Long examId, @RequestParam boolean isFinish, @RequestParam int remainingTime) throws JsonProcessingException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<ExamUser> examUser = Optional.ofNullable(examUserService.findByExamAndUser(examId, username));
        if (!examUser.isPresent()) {
            throw new EntityNotFoundException("Not found this exam");
        } else {
            if (examUser.get().getIsFinished()) {

                throw new ExceptionInInitializerError("This exam was end");
            }
            ObjectMapper mapper = new ObjectMapper();
            String answerSheetConvertToJson = mapper.writeValueAsString(answerSheets);
            examUser.get().setAnswerSheet(answerSheetConvertToJson);
            examUser.get().setIsFinished(isFinish);
            if (isFinish == true) {
                examUser.get().setTimeFinish(new Date());
            }
            examUser.get().setRemainingTime(remainingTime);
            examUserService.update(examUser.get());
        }

    }


    @GetMapping(value = "/exams/{examId}/result/all")
    public ResponseEntity getResultExamAll(@PathVariable Long examId) throws IOException {
        List<ExamResult> examResults = new ArrayList<>();
        Optional<Exam> exam = examService.getExamById(examId);
        if (!exam.isPresent()) {
            return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
        }
        List<ExamUser> examUserList = examUserService.findAllByExam_Id(exam.get().getId());
        List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
        Date now = new Date();
        for (ExamUser examUser :
                examUserList) {
            ExamResult examResult = new ExamResult();
            examResult.setExam(exam.get());
            List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
            if (userChoices.isEmpty()) {
                examResult.setTotalPoint(null);
                examResult.setUser(examUser.getUser());
                examResult.setExamStatus(0);

            } else {
                List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
                examResult.setChoiceList(choiceLists);
                Double totalPoint = 0.0;
                for (ChoiceList choice : choiceLists) {
                    if (choice.getIsSelectedCorrected().equals(true)) {
                        totalPoint += choice.getPoint();
                    }
                }
                examResult.setTotalPoint(totalPoint);
                if (examUser.getTotalPoint() == -1) {
                    examUser.setTotalPoint(totalPoint);
                    examUserService.update(examUser);
                }
            }

            examResult.setUser(examUser.getUser());
            examResult.setUserTimeBegin(examUser.getTimeStart());
            examResult.setUserTimeFinish(examUser.getTimeFinish());
            if (exam.get().getFinishExam().compareTo(now) < 0 && examUser.getIsStarted().equals(false)) {
                examResult.setExamStatus(-2);
            } else if (examUser.getIsStarted().equals(false) && exam.get().getFinishExam().compareTo(now) == 1) {
                examResult.setExamStatus(0);
            } else if (examUser.getIsFinished().equals(true)) {
                examResult.setExamStatus(-1);
            } else {
                examResult.setExamStatus(1);
            }
            examResults.add(examResult);
        }
        return new ResponseEntity(examResults, HttpStatus.OK);
    }

    @GetMapping(value = "/exams/{examId}/result/all/question-report")
    public ResponseEntity getResultExamQuestionsReport(@PathVariable Long examId) throws IOException {

        Optional<Exam> exam = examService.getExamById(examId);
        if (!exam.isPresent()) {
            logger.error("NOT found");
            return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
        }
        List<ExamUser> finishedExamUser = examUserService.findExamUsersByIsFinishedIsTrueAndExam_Id(examId);
        if (finishedExamUser.size() == 0) {
            return new ResponseEntity("Chưa có người dùng thực hiện bài kiểm tra", HttpStatus.OK);
        }
        ExamUser firstExamUser = finishedExamUser.get(0);
        List<QuestionExamReport> questionExamReports = new ArrayList<>();
        List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
//        convert answer sheet of first user
        List<AnswerSheet> userChoicesFirstExam = convertAnswerJsonToObject(firstExamUser);
//        get exam result of first user
        List<ChoiceList> firstChoiceList = examService.getChoiceList(userChoicesFirstExam, examQuestionPoints);
        for (ChoiceList choice : firstChoiceList) {
            QuestionExamReport questionExamReport = new QuestionExamReport();
            questionExamReport.setQuestion(choice.getQuestion());

            if (choice.getIsSelectedCorrected().equals(true)) {
                questionExamReport.setCorrectTotal(1);
            } else {
                questionExamReport.setCorrectTotal(0);
            }
            questionExamReports.add(questionExamReport);
        }

//        done for first user
        if (questionExamReports.size() == 0) {
            return new ResponseEntity(questionExamReports, HttpStatus.OK);
        }
        for (int i = 1; i < finishedExamUser.size(); i++) {
            List<AnswerSheet> userChoices = convertAnswerJsonToObject(firstExamUser);
//        get exam result of first user
            List<ChoiceList> choiceList = examService.getChoiceList(userChoices, examQuestionPoints);
            for (ChoiceList choice : firstChoiceList) {

                List<QuestionExamReport> questionExamReportsList = questionExamReports.stream().filter(item -> item.getQuestion().getId() == choice.getQuestion().getId()).collect(Collectors.toList());
                QuestionExamReport questionExamReport = questionExamReportsList.get(0);
                if (choice.getIsSelectedCorrected().equals(true)) {
                    questionExamReport.setCorrectTotal(questionExamReport.getCorrectTotal() + 1);
                }
            }
        }
        return new ResponseEntity(questionExamReports, HttpStatus.OK);
    }

    @GetMapping(value = "/exams/{examId}/result")
    public ResponseEntity getResultExam(@PathVariable Long examId) throws IOException {
        ExamResult examResult = new ExamResult();
        String username = userService.getUserName();
        Optional<Exam> exam = examService.getExamById(examId);

        if (!exam.isPresent()) {
            return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
        }
//        Set exam for examResult
        examResult.setExam(exam.get());

//        Set list question user's choice for examResult
        List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
        ExamUser examUser = examUserService.findByExamAndUser(examId, username);
        List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
        List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
        examResult.setChoiceList(choiceLists);
        Double totalPoint = 0.0;
        for (ChoiceList choice : choiceLists) {
            if (choice.getIsSelectedCorrected().equals(true)) {
                totalPoint += choice.getPoint();
            }
        }
        examResult.setTotalPoint(totalPoint);
        if (examUser.getTotalPoint() == -1) {
            examUser.setTotalPoint(totalPoint);
            examUserService.update(examUser);
        }
        return new ResponseEntity(examResult, HttpStatus.OK);
    }

    @GetMapping(value = "/exams/{examId}/users/{username}/result")
    public ResponseEntity getResultExamByUser(@PathVariable Long examId, @PathVariable String username) throws IOException {
        ExamResult examResult = new ExamResult();
        Optional<Exam> exam = examService.getExamById(examId);
        User user = userService.getUserByUsername(username).get();
        if (!exam.isPresent()) {
            return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
        }
//        Set exam for examResult
        examResult.setExam(exam.get());
        examResult.setUser(user);

//        Set list question user's choice for examResult
        List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
        ExamUser examUser = examUserService.findByExamAndUser(examId, username);
        List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
        List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
        examResult.setChoiceList(choiceLists);
        Double totalPoint = 0.0;
        for (ChoiceList choice : choiceLists) {
            if (choice.getIsSelectedCorrected().equals(true)) {
                totalPoint += choice.getPoint();
            }
        }
        examResult.setTotalPoint(totalPoint);
        if (examUser.getTotalPoint() == -1) {
            examUser.setTotalPoint(totalPoint);
            examUserService.update(examUser);
        }
        examResult.setUserTimeFinish(examUser.getTimeFinish());
        examResult.setUserTimeBegin(examUser.getTimeStart());
        examResult.setRemainingTime(exam.get().getDurationExam() * 60 - examUser.getRemainingTime());
        return new ResponseEntity(examResult, HttpStatus.OK);
    }

    public List<AnswerSheet> convertAnswerJsonToObject(ExamUser examUser) throws IOException {

//        ObjectMapper mapper = new ObjectMapper();
        if (Strings.isNullOrEmpty(examUser.getAnswerSheet())) {
            return Collections.emptyList();
        }

        String answerSheet = examUser.getAnswerSheet();
        List<AnswerSheet> choiceUsers = mapper.readValue(answerSheet, new TypeReference<List<AnswerSheet>>() {
        });
        return choiceUsers;
    }

    @GetMapping(value = "/exam/{id}/question-text")
    public List<ExamDetail> getQuestionTextByExamId(@PathVariable Long id) throws IOException {
        Optional<Exam> exam = examService.getExamById(id);
        List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
        List<ExamDetail> questions = new ArrayList<>();
        examQuestionPoints.forEach(examQuestionPoint -> {
            ExamDetail examDetail = new ExamDetail();
            Question question = questionService.getQuestionById(examQuestionPoint.getQuestionId()).get();
            examDetail.setQuestionText(question.getQuestionText());
            examDetail.setPoint(examQuestionPoint.getPoint());
            examDetail.setDifficultyLevel(question.getDifficultyLevel().toString());
            examDetail.setQuestionType(question.getQuestionType().getDescription());
            questions.add(examDetail);
        });
        return questions;
    }

    public List<ExamQuestionPoint> convertQuestionJsonToObject(Optional<Exam> exam) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
        String answerSheet = exam.get().getQuestionData();
        List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(answerSheet, new TypeReference<List<ExamQuestionPoint>>() {
        });
        return examQuestionPoints;
    }

    @GetMapping(value = "/exams/schedule")
    public List<ExamCalendar> getExamCalendar() {
        Date now = new Date();
        String username = userService.getUserName();
        List<ExamUser> examUsers = examUserService.getExamListByUsername(username);
        List<ExamCalendar> examCalendars = new ArrayList<ExamCalendar>();
        examUsers.forEach(examUser -> {
            ExamCalendar examCalendar = new ExamCalendar();
            examCalendar.setCourseName(examUser.getExam().getPart().getCourse().getName());
            examCalendar.setExamTitle(examUser.getExam().getTitle());
            examCalendar.setCourseCode(examUser.getExam().getPart().getCourse().getCourseCode());
            examCalendar.setPartName(examUser.getExam().getPart().getName());
            examCalendar.setExamId(examUser.getExam().getId());
            examCalendar.setDurationExam(examUser.getExam().getDurationExam());
            examCalendar.setBeginDate(examUser.getExam().getBeginExam());
            examCalendar.setFinishDate(examUser.getExam().getFinishExam());
//            if (examUser.getIsFinished().equals(true)) {
//                examCalendar.setCompleteString("Completed");
//                examCalendar.setCompleted(true);
//            } else {
//                examCalendar.setCompleteString("Coming");
//                examCalendar.setCompleted(false);
//            }


            if (examUser.getExam().getFinishExam().compareTo(now) < 0 && examUser.getIsStarted().equals(false)) {
                examCalendar.setCompleteString("Missed");
                examCalendar.setIsCompleted(-2);
            } else if (examUser.getIsStarted().equals(false) && examUser.getExam().getBeginExam().compareTo(now) == 1) {
                examCalendar.setCompleteString("Not yet started");
                examCalendar.setIsCompleted(0);
            } else if (examUser.getIsFinished().equals(true)) {
                examCalendar.setCompleteString("Completed");
                examCalendar.setIsCompleted(-1);
            } else {
                examCalendar.setCompleteString("Doing");
                examCalendar.setIsCompleted(1);
            }

            examCalendars.add(examCalendar);

        });
        return examCalendars;
    }

    @GetMapping(value = "/exams/{id}/cancel")
    public void cancelExam(@PathVariable Long id) {
        String username = userService.getUserName();
        User user = userService.getUserByUsername(username).get();
        Date now = new Date();
        Exam exam = examService.getExamById(id).get();
        if (exam.getBeginExam().compareTo(now) > 0) {

//            exam.setCanceled(true);
            examService.cancelExam(id);
            logger.error("LLLLL");

        }
    }

}


