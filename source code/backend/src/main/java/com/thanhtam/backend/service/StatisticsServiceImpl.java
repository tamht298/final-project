package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.*;
import com.thanhtam.backend.repository.*;
import org.decimal4j.util.DoubleRounder;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private ExamRepository examRepository;
    private ExamUserRepository examUserRepository;
    private QuestionRepository questionRepository;
    private UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(StatisticsServiceImpl.class);

    @Autowired
    public StatisticsServiceImpl(ExamRepository examRepository, ExamUserRepository examUserRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.examRepository = examRepository;
        this.examUserRepository = examUserRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public long countExamTotal() {
        return examRepository.count();
    }

    @Override
    public long countQuestionTotal() {
        return questionRepository.count();
    }

    @Override
    public long countAccountTotal() {
        return userRepository.count();
    }

    @Override
    public long countExamUserTotal() {
        return examUserRepository.count();
    }


    @Override
    public Double getChangeExamUser() {
        int countExamNow = 0;
        int countExamLastWeek = 0;
        List<ExamUser> examUsers = examUserRepository.findExamUsersByOrderByTimeFinish();
        for (ExamUser examUser :
                examUsers) {
            if (isSameWeek(new DateTime(), new DateTime(examUser.getTimeFinish()))) {
                countExamNow++;
            } else if (isLastWeek(new DateTime(), new DateTime(examUser.getTimeFinish()))) {
                countExamLastWeek++;
            } else break;
        }
        if (countExamNow == 0 && countExamLastWeek == 0) {
            return 0.00;
        }
        if (countExamNow == 0 && countExamLastWeek != 0) {
            return countExamLastWeek * -100.00;
        }
        if (countExamNow != 0 && countExamLastWeek == 0) {
            return countExamNow * 100.00;
        }
        Double result = (double) countExamNow - countExamLastWeek;
        result = DoubleRounder.round(result / countExamLastWeek, 2);

        return result * 100;
    }

    @Override
    public List<Long> countExamUserLastedSevenDaysTotal() {
        List<Long> days = new ArrayList<>();
        List<ExamUser> examUserList = examUserRepository.findExamUsersByOrderByTimeFinish();
        long countDate = 0;
        for (ExamUser examUser :
                examUserList) {
            int day = 0;
            if (isSameDay(new DateTime(new Date()).minusDays(day), new DateTime(examUser.getTimeFinish()))) {
                countDate++;
            } else {
                day++;
                days.add(countDate);
                countDate = 0;
                if (day == 7) {
                    break;
                }
            }
            logger.error(days.toString());
        }
        Collections.reverse(days);
        return days;
    }

    @Override
    public Double getChangeQuestion() {
        int countQuestionNow = 0;
        int countQuestionLastWeek = 0;
        List<Question> questions = questionRepository.findByOrderByCreatedDateDesc();
        for (Question question :
                questions) {
            if (isSameWeek(new DateTime(), new DateTime(question.getCreatedDate()))) {
                countQuestionNow++;
            } else if (isLastWeek(new DateTime(), new DateTime(question.getCreatedDate()))) {
                countQuestionLastWeek++;
            } else break;
        }
        if (countQuestionNow == 0 && countQuestionLastWeek == 0) {
            return 0.00;
        }
        if (countQuestionNow == 0 && countQuestionLastWeek != 0) {
            return countQuestionLastWeek * -100.00;
        }
        if (countQuestionNow != 0 && countQuestionLastWeek == 0) {
            return countQuestionNow * 100.00;
        }
        Double result = (double) countQuestionNow - countQuestionLastWeek;
        result = DoubleRounder.round(result / countQuestionLastWeek, 2);

        return result * 100;
    }

    @Override
    public Double getChangeAccount() {
        int countAccountNow = 0;
        int countAccountLastWeek = 0;
        List<User> users = userRepository.findByDeletedIsFalseOrderByCreatedDateDesc();
        for (User user :
                users) {
            if (isSameWeek(new DateTime(), new DateTime(user.getCreatedDate()))) {
                countAccountNow++;
            } else if (isLastWeek(new DateTime(), new DateTime(user.getCreatedDate()))) {
                countAccountLastWeek++;
            } else break;
        }
        logger.error("account now: "+ countAccountNow);
        logger.error("account last: "+ countAccountLastWeek);
        if (countAccountNow == 0 && countAccountLastWeek == 0) {
            return 0.00;
        }
        if (countAccountNow == 0 && countAccountLastWeek != 0) {
            return countAccountLastWeek * -100.00;
        }
        if (countAccountNow != 0 && countAccountLastWeek == 0) {
            return countAccountNow * 100.00;
        }
        Double result = (double) countAccountNow - countAccountLastWeek;
        result = DoubleRounder.round(result / countAccountLastWeek, 2);

        return result * 100;

    }

    @Override
    public Double getChangeExam() {
        int countExamNow = 0;
        int countExamLastWeek = 0;
        List<Exam> exams = examRepository.findByCanceledIsTrueOrderByCreatedDateDesc();
        for (Exam exam :
                exams) {
            if (isSameWeek(new DateTime(), new DateTime(exam.getCreatedDate()))) {
                countExamNow++;
            } else if (isLastWeek(new DateTime(), new DateTime(exam.getCreatedDate()))) {
                countExamLastWeek++;
            } else break;
        }
        if (countExamNow == 0 && countExamLastWeek == 0) {
            return 0.00;
        }
        if (countExamNow == 0 && countExamLastWeek != 0) {
            return countExamLastWeek * -100.00;
        }
        if (countExamNow != 0 && countExamLastWeek == 0) {
            return countExamNow * 100.00;
        }
        Double result = (double) countExamNow - countExamLastWeek;
        result = DoubleRounder.round(result / countExamLastWeek, 2);

        return result * 100;

    }

    public static boolean isSameDay(final DateTime d1, final DateTime d2) {
        if ((d1 == null) || (d2 == null))
            throw new IllegalArgumentException("The date must not be null");
        final int date1 = d1.getDayOfMonth();
        final int date2 = d2.getDayOfMonth();

        final int week1 = d1.getWeekOfWeekyear();
        final int week2 = d2.getWeekOfWeekyear();

        final int year1 = d1.getWeekyear();
        final int year2 = d2.getWeekyear();

        final int era1 = d1.getEra();
        final int era2 = d2.getEra();

        if ((date1 == date2) && (week1 == week2) && (year1 == year2) && (era1 == era2))
            return true;

        // Return false if none of the conditions are satisfied
        return false;
    }

    public static boolean isSameWeek(final DateTime d1, final DateTime d2) {
        if ((d1 == null) || (d2 == null))
            throw new IllegalArgumentException("The date must not be null");

        // It is important to use week of week year & week year

        final int week1 = d1.getWeekOfWeekyear();
        final int week2 = d2.getWeekOfWeekyear();

        final int year1 = d1.getWeekyear();
        final int year2 = d2.getWeekyear();

        final int era1 = d1.getEra();
        final int era2 = d2.getEra();

        // Return true if week, year and era matches
        if ((week1 == week2) && (year1 == year2) && (era1 == era2))
            return true;

        // Return false if none of the conditions are satisfied
        return false;
    }

    public static boolean isLastWeek(final DateTime d1, final DateTime d2) {
        if ((d1 == null) || (d2 == null))
            throw new IllegalArgumentException("The date must not be null");

        // It is important to use week of week year & week year

        final int week1 = d1.getWeekOfWeekyear() - 1;
        final int week2 = d2.getWeekOfWeekyear();

        final int year1 = d1.getWeekyear();
        final int year2 = d2.getWeekyear();

        final int era1 = d1.getEra();
        final int era2 = d2.getEra();

        // Return true if week, year and era matches
        if ((week1 == week2) && (year1 == year2) && (era1 == era2))
            return true;

        // Return false if none of the conditions are satisfied
        return false;
    }
}
