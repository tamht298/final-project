package com.devzone.backendonlineexam.entity;

import com.devzone.backendonlineexam.ultilities.Status;

public class ServiceResult {
    private Status status = Status.SUCCESS;
    private String message;
    private Object data;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
