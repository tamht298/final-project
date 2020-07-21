package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.CourseChart;
import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.ExamUser;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.CourseService;
import com.thanhtam.backend.service.ExamUserService;
import com.thanhtam.backend.service.UserService;
import org.decimal4j.util.DoubleRounder;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class ChartController {
    Logger logger = LoggerFactory.getLogger(ChartController.class);

    private CourseService courseService;
    private UserService userService;
    private ExamUserService examUserService;

    @Autowired
    public ChartController(CourseService courseService, UserService userService, ExamUserService examUserService) {
        this.courseService = courseService;
        this.userService = userService;
        this.examUserService = examUserService;
    }

    @GetMapping(value = "/charts/courses")
    public List<CourseChart> getCourseChart() {
        List<CourseChart> courseCharts = new ArrayList<CourseChart>();
        String username = userService.getUserName();
        User user = userService.getUserByUsername(username).get();
        List<Course> courses = courseService.findAllByIntakeId(user.getIntake().getId());

        for (Course course :
                courses) {
            CourseChart courseChart = new CourseChart();
            courseChart.setCourseName(course.getName());
            courseChart.setCourseCode(course.getCourseCode());
            List<ExamUser> examUserListComplete = examUserService.getCompleteExams(course.getId(), username);
//            Double avgPoint = examUserListComplete.stream().mapToDouble(ExamUser::getTotalPoint).sum() / examUserListComplete.size();
            Double avgPoint = 0.0;
            int currentCountExamComplete = 0;
            int lastWeekCountExamComplete = 0;
            for (ExamUser x :
                    examUserListComplete) {
                avgPoint += x.getTotalPoint();
                if (isSameWeek(new DateTime(), new DateTime(x.getTimeFinish()))) {
                    currentCountExamComplete++;
                } else if (isLastWeek(new DateTime(), new DateTime(x.getTimeFinish()))){
                    lastWeekCountExamComplete++;
                }
            }
            courseChart.setCountExam(examUserListComplete.size());
            Double avg = avgPoint/examUserListComplete.size();
            courseChart.setTotalPoint(DoubleRounder.round(avg,2));
            if(lastWeekCountExamComplete==0 && currentCountExamComplete!=0){
                courseChart.setCompareLastWeek(1);
                courseChart.setChangeRating((double) currentCountExamComplete*100);
                logger.error("1");
            }
            else if(lastWeekCountExamComplete==0 && currentCountExamComplete==0){
                courseChart.setCompareLastWeek(0);
                courseChart.setChangeRating(0.0);
                logger.error("2");
            }
            else if(lastWeekCountExamComplete!=0 && currentCountExamComplete==0){
                courseChart.setCompareLastWeek(-1);
                courseChart.setChangeRating((double) lastWeekCountExamComplete*100);
                logger.error("3");
            }
            else {
                logger.error("currentCountExamComplete: "+ currentCountExamComplete);
                logger.error("lastWeekCountExamComplete: "+ lastWeekCountExamComplete);
                Double rate = (double)currentCountExamComplete - lastWeekCountExamComplete;
                courseChart.setChangeRating(DoubleRounder.round(rate/lastWeekCountExamComplete, 2)*100);
                if(rate>0){
                    courseChart.setCompareLastWeek(1);
                }
                else if(rate==0){
                    courseChart.setCompareLastWeek(0);
                }
                else courseChart.setCompareLastWeek(-1);
                logger.error(rate.toString());
            }
            courseCharts.add(courseChart);
        }
        return courseCharts;
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

        final int week1 = d1.getWeekOfWeekyear()-1 ;
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
