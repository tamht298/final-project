package com.thanhtam.backend.controller;

import com.thanhtam.backend.dto.ServiceResult;
import com.thanhtam.backend.entity.FileInfo;
import com.thanhtam.backend.service.FilesStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileController.class);
    private FilesStorageService filesStorageService;

    @Autowired
    public FileController(FilesStorageService filesStorageService) {
        this.filesStorageService = filesStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ServiceResult> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            filesStorageService.save(file, "uploads");


            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), message, file.getContentType()));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            LOGGER.error(e.getMessage());
            return ResponseEntity.badRequest().body(new ServiceResult(HttpStatus.EXPECTATION_FAILED.value(), message, null));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = filesStorageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = filesStorageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }



}
