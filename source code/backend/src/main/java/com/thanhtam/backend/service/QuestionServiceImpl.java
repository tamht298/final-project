package com.thanhtam.backend.service;

import com.thanhtam.backend.controller.ExamController;
import com.thanhtam.backend.dto.AnswerSheet;
import com.thanhtam.backend.dto.ExamQuestionPoint;
import com.thanhtam.backend.entity.*;
import com.thanhtam.backend.repository.QuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    Logger logger = LoggerFactory.getLogger(QuestionServiceImpl.class);
    private QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Question> getQuestionByPart(Part part) {
        return questionRepository.findByPart(part);
    }

    @Override
    public List<Question> getQuestionByQuestionType(QuestionType questionType) {
        return questionRepository.findByQuestionType(questionType);
    }

    @Override
    public List<Question> getQuestionPointList(List<ExamQuestionPoint> examQuestionPoints) {
        List<Question> questions = new ArrayList<>();
        examQuestionPoints.forEach(examQuestionPoint -> {
            Optional<Question> question = questionRepository.findById(examQuestionPoint.getQuestionId());
            questions.add(question.get());
        });
        return questions;
    }

    @Override
    public List<AnswerSheet> convertFromQuestionList(List<Question> questionList) {
        List<AnswerSheet> answerSheets = new ArrayList<>();
        questionList.forEach(question -> {
            List<Choice> choices = question.getChoices();
            choices.stream().map(choice -> {
                choice.setIsCorrected(0);
                return choice;
            }).collect(Collectors.toList());
            AnswerSheet answerSheet = new AnswerSheet(question.getId(), question.getChoices(), question.getPoint());
            answerSheets.add(answerSheet);
        });
        return answerSheets;
    }

    @Override
    public List<Question> getQuestionList() {
        return questionRepository.findAll();
    }

    @Override
    public Page<Question> findQuestionsByPart(Pageable pageable, Part part) {
        return questionRepository.findQuestionsByPart(pageable, part);
    }

    @Override
    public Page<Question> findQuestionsByPartAndDeletedFalse(Pageable pageable, Part part) {
        return questionRepository.findQuestionsByPartAndDeletedFalse(pageable, part);
    }

    @Override
    public Page<Question> findQuestionsByPart_IdAndCreatedBy_UsernameAndDeletedFalse(Pageable pageable, Long partId, String username) {
        return questionRepository.findQuestionsByPart_IdAndCreatedBy_UsernameAndDeletedFalse(pageable, partId, username);
    }

    @Override
    public Page<Question> findAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable);
    }

    @Override
    public String findQuestionTextById(Long questionId) {
        return questionRepository.findQuestionTextById(questionId);
    }

    @Override
    public Page<Question> findQuestionsByPart_IdAndCreatedBy_Username(Pageable pageable, Long partId, String username) {
        return questionRepository.findQuestionsByPart_IdAndCreatedBy_Username(pageable, partId, username);
    }

    @Override
    public Page<Question> findQuestionsByCreatedBy_Username(Pageable pageable, String username) {
        return questionRepository.findQuestionsByCreatedBy_Username(pageable, username);
    }


    @Override
    public void save(Question question) {
        int point;
        switch (question.getDifficultyLevel()) {
            case EASY: {
                point = 5;
                break;
            }
            case MEDIUM: {
                point = 10;
                break;
            }
            case HARD: {
                point = 15;
                break;
            }
            default:
                point = 0;
        }
        question.setPoint(point);
        questionRepository.save(question);
    }

    @Override
    public void update(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

}
