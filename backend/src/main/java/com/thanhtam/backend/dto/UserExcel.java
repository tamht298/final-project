package com.thanhtam.backend.dto;

import lombok.Data;

@Data
public class UserExcel extends ServiceResult {
    private int userTotal;

    public UserExcel(int statusCode, String message, Object data, int userTotal) {
        super(statusCode, message, data);
        this.userTotal = userTotal;
    }
}
