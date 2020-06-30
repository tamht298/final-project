package com.thanhtam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceList{
    private String questionText;
    private List<ChoiceCorrect> choices;
    private Integer point;
}
