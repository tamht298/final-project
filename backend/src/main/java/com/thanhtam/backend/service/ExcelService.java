package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.User;

import java.io.IOException;
import java.util.List;

public interface ExcelService {
    List<User> readUserFromExcelFile(String excelFilePath) throws IOException;
    void InsertUserToDB(List<User> userList);
}
