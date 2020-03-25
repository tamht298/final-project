package com.thanhtam.backend.entity;

import com.thanhtam.backend.ultilities.Status;
import lombok.Data;

@Data
public class ServiceResult {

    private Status status = Status.SUCCESS;
    private int statusCode;
    private String message;
    private Object data;

}
