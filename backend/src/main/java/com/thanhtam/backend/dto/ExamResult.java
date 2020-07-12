package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Choice;
import com.thanhtam.backend.entity.Exam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult {
    private Exam exam;
    private List<ChoiceList> choiceList;
    private Double totalPoint;
    private String fullName;
    private Date userTimeBegin;
    private Date userTimeFinish;
    private int examStatus;


    public ExamResult(Exam exam, List<ChoiceList> choiceList, Double totalPoint) {
        this.exam = exam;
        this.choiceList = choiceList;
        this.totalPoint = totalPoint;
    }


}
