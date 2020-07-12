package com.thanhtam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CourseChart {

    private String courseCode;
    private String courseName;
    private Double totalPoint = 0.0;
    private int countExam =0;
    private Double changeRating = 0.0;
    private int compareLastWeek;
}
