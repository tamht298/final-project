package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Exam;
import com.thanhtam.backend.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamQuestionList {
    private Exam exam;
    private List<Question> questions;
    private int remainingTime;
}
