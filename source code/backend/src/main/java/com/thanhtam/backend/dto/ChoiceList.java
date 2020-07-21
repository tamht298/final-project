package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceList{
    private Question question;
    private List<ChoiceCorrect> choices;
    private Integer point;
    private Boolean isSelectedCorrected;
}
