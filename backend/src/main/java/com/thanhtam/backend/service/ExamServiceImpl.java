package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.AnswerSheet;
import com.thanhtam.backend.dto.ChoiceList;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.ExamRepository;
import com.thanhtam.backend.repository.IntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExamServiceImpl implements ExamService {

    private ExamRepository examRepository;
    private IntakeRepository intakeRepository;
    private PartService partService;
    private UserService userService;

    @Autowired
    public ExamServiceImpl(ExamRepository examRepository, IntakeRepository intakeRepository, PartService partService, UserService userService) {
        this.examRepository = examRepository;
        this.intakeRepository = intakeRepository;
        this.partService = partService;
        this.userService = userService;
    }

    @Override
    public Exam saveExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getAll() {
        return examRepository.findAll();
    }

    @Override
    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    @Override
    public List<ChoiceList> getChoiceList(List<AnswerSheet> userChoices, List<ExamQuestionPoint> examQuestionPoints) {
        List<ChoiceList> choiceLists = new ArrayList<>();
        userChoices.forEach(userChoice -> {
            ChoiceList choiceList = new ChoiceList();

            choiceLists.add(choiceList);
        });

        return choiceLists;
    }
}
