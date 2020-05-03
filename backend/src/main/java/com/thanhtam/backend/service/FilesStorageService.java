package com.thanhtam.backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
    public void initRootFolder();

    public void initExcelFolder();

    public boolean existRootFolder();

    public boolean existExcelFolder();

    public void save(MultipartFile file, String filePath);

    public Resource load(String filename);

    public void deleteAllUserExcel(String fileName) throws IOException;


    public Stream<Path> loadAll();
}
