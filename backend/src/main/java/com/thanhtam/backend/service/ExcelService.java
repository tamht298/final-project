package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.UserExport;
import com.thanhtam.backend.entity.User;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface ExcelService {
    List<User> readUserFromExcelFile(String excelFilePath) throws IOException;

    void writeUserToExcelFile(ArrayList<UserExport> userExports) throws IOException;
    void InsertUserToDB(List<User> userList);
}
