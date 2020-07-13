package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.UserExcel;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.ExcelService;
import com.thanhtam.backend.service.FilesStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api")
public class ExcelController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelController.class);
    private FilesStorageService filesStorageService;
    private ExcelService excelService;

    @Autowired
    public ExcelController(FilesStorageService filesStorageService, ExcelService excelService) {
        this.filesStorageService = filesStorageService;
        this.excelService = excelService;
    }

    @PostMapping("/file/import/users")
    public ResponseEntity<UserExcel> uploadUserToDB(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        try {
            String filePath = "excel-import-user";
            //Save file to local storage
            filesStorageService.save(file, filePath);

            //Read file
            List<User> userList = excelService.readUserFromExcelFile(filePath + "\\" + file.getOriginalFilename());
            //Insert list of user into database
            excelService.InsertUserToDB(userList);

            message = "Uploaded the user list successfully: " + file.getOriginalFilename();
            return ResponseEntity.ok().body(new UserExcel(HttpStatus.OK.value(), message, userList, userList.size()));
        } catch (Exception e) {
            message = "Could not upload the user list: " + file.getOriginalFilename() + "!";
            LOGGER.error(e.toString());
            return ResponseEntity.badRequest().body(new UserExcel(HttpStatus.EXPECTATION_FAILED.value(), message, null, 0));
        } finally {
            filesStorageService.deleteAllUserExcel(file.getOriginalFilename());
        }
    }

}
