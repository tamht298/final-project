package com.thanhtam.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.stream.Stream;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {
    private static final Logger LOGGER = LoggerFactory.getLogger(FilesStorageServiceImpl.class);
    private final Path root = Paths.get("uploads");
    private final Path excelPath = Paths.get("excel-import-user");

    @Override
    public void initRootFolder() {
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void initExcelFolder() {
        try {
            Files.createDirectory(excelPath);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for excel import!");
        }
    }

    @Override
    public boolean existRootFolder() {
        if (Files.notExists(root)) {
            return false;
        }
        return true;
    }

    @Override
    public boolean existExcelFolder() {
        if (Files.notExists(excelPath)) {
            return false;
        }
        return true;
    }

    @Override
    public void save(MultipartFile file, String filePath) {
        Path uploadRoot = Paths.get(filePath);
        try {
            String fileName = new Date().getTime() + "-" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), uploadRoot.resolve(file.getOriginalFilename()));

        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAllUserExcel(String fileName) throws IOException {
//        FileSystemUtils.deleteRecursively(excelPath.toFile());
        Files.delete(Paths.get(excelPath + "\\" + fileName));
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
