package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.StatisticsDashboard;
import com.thanhtam.backend.service.StatisticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
@RestController
@Slf4j
public class StatisticsController {
    private StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping(value = "/statistics")
    public StatisticsDashboard getStatistics() {
        StatisticsDashboard statisticsDashboard = new StatisticsDashboard();
        statisticsDashboard.setAccountTotal(statisticsService.countAccountTotal());
        statisticsDashboard.setExamTotal(statisticsService.countExamTotal());
        statisticsDashboard.setExamUserTotal(statisticsService.countExamUserTotal());
        statisticsDashboard.setQuestionTotal(statisticsService.countQuestionTotal());
        statisticsDashboard.setChangeQuestion(statisticsService.getChangeQuestion());
        statisticsDashboard.setChangeExam(statisticsService.getChangeExam());
        statisticsDashboard.setChangeAccount(statisticsService.getChangeAccount());
        statisticsDashboard.setChangeExamUser(statisticsService.getChangeExamUser());
        statisticsDashboard.setExamUserLastedSevenDaysTotal(statisticsService.countExamUserLastedSevenDaysTotal());
        return statisticsDashboard;
    }
}
