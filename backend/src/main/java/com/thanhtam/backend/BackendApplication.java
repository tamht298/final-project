package com.thanhtam.backend;

import com.thanhtam.backend.audit.SpringSecurityAuditorAware;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.service.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.Resource;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BackendApplication implements CommandLineRunner {

    @Resource
    FilesStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public AuditorAware<User> auditorAware() {
        return new SpringSecurityAuditorAware();
    }

    @Override
    public void run(String... args) throws Exception {
        if (storageService.existRootFolder() == false) {
            storageService.initRootFolder();
        }
        if (storageService.existExcelFolder() == false) {
            storageService.initExcelFolder();
        }
    }
}
