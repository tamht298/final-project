package com.thanhtam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordUpdate {
    private String currentPassword;
    private String newPassword;
}
