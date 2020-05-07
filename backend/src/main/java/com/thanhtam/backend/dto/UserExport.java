package com.thanhtam.backend.dto;

import com.opencsv.bean.CsvBindByPosition;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserExport {
    @CsvBindByPosition(position = 0)
    private String username;
    @CsvBindByPosition(position = 3)
    private String email;
    @CsvBindByPosition(position = 1)
    private String firstName;
    @CsvBindByPosition(position = 2)
    private String lastName;

}
