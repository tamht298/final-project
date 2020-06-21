package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Exam;
import lombok.Data;

import java.util.List;

@Data
public class ExamDto {
    private Exam exam;
    private List<ExamQuestionPoint> examQuestionPoints;
}
