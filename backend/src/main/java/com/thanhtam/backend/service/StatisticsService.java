package com.thanhtam.backend.service;

public interface StatisticsService {
    long countExamTotal();
    long countQuestionTotal();
    long countAccountTotal();
    long countExamUserTotal();
    Double getChangeExam();
    Double getChangeQuestion();
    Double getChangeAccount();
    Double getChangeExamUser();
}
