package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.entity.Question;
import com.thanhtam.backend.entity.QuestionType;
import com.thanhtam.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
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
    public List<Question> getQuestionList() {
        return questionRepository.findAll();
    }

    @Override
    public Page<Question> findQuestionsByPart(Pageable pageable, Part part) {
        return questionRepository.findQuestionsByPart(pageable, part);
    }

    @Override
    public Page<Question> findAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable);
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
                point=0;
        }
        question.setPoint(point);
        questionRepository.save(question);
    }

    @Override
    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

}
