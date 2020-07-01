package com.thanhtam.backend.dto;

import com.thanhtam.backend.entity.Choice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceCorrect {
    private Choice choice;
    private Integer isRealCorrect;
}
