package com.thanhtam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsDashboard {
    private long examTotal;
    private long accountTotal;
    private long questionTotal;
    private long intakeTotal;
    private Double changeExam;
    private Double changeAccount;
    private Double changeQuestion;
    private Double changeIntake;
}
