package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.ExamUser;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.ExamUserRepository;
import jdk.nashorn.internal.runtime.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExamUserServiceImpl implements ExamUserService {
    private ExamUserRepository examUserRepository;

    @Autowired
    public ExamUserServiceImpl(ExamUserRepository examUserRepository) {
        this.examUserRepository = examUserRepository;
    }

    @Override
    public void create(Exam exam, List<User> userSet) {
        List<ExamUser> examUserList = new ArrayList<>();
        System.out.println("size: "+ examUserList.size());
        userSet.forEach(user -> {
            ExamUser examUser = new ExamUser();
            examUser.setUser(user);
            examUser.setExam(exam);
            examUser.setRemainingTime(exam.getDurationExam()*60);
            examUserList.add(examUser);

        });
       examUserRepository.saveAll(examUserList);

    }

    @Override
    public List<ExamUser> getExamListByUsername(String username) {
        return examUserRepository.findAllByUser_Username(username);
    }

    @Override
    public ExamUser findByExamAndUser(Long examId, String username) {
        return examUserRepository.findByExam_IdAndUser_Username(examId, username);
    }

    @Override
    public void update(ExamUser examUser) {
        examUserRepository.save(examUser);
    }

    @Override
    public Optional<ExamUser> findExamUserById(Long id) {
        return examUserRepository.findById(id);
    }
}
