package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Choice;
import com.thanhtam.backend.entity.Exam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult {
    private Exam exam;
    private List<ChoiceList> choiceList;

}
