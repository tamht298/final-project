package com.thanhtam.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface S3Services {
    ByteArrayOutputStream downloadS3File(String keyName);
    void uploadS3File(String keyName, MultipartFile file);
    List<String> listS3Files();
    void deleteFile(String keyName);
}
