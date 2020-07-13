package com.thanhtam.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    private String fromAddress;
//    private String toAddress;
    private String subject;
    private String body;
}
