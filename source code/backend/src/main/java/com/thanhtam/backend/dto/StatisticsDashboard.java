package com.thanhtam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsDashboard {
    private long examTotal;
    private long accountTotal;
    private long questionTotal;
    private long examUserTotal;
    private Double changeExam;
    private Double changeAccount;
    private Double changeQuestion;
    private Double changeExamUser;
    private List<Long> examUserLastedSevenDaysTotal;
}
