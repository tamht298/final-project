package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.ExamUser;
import com.thanhtam.backend.entity.User;

import java.util.List;
import java.util.Set;

public interface ExamUserService {
    void create(Exam exam, List<User> userSet);
    List<ExamUser> getExamListByUsername(String username);
    ExamUser findByExamAndUser(Long examId, String username);
    void update(ExamUser examUser);

}
