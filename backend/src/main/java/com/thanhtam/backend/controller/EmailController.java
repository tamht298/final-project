package com.thanhtam.backend.controller;

import com.thanhtam.backend.entity.Email;
import com.thanhtam.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", maxAge = 3600)

public class EmailController {

    private EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping(value = "/send-email")
    public void sendEmail(@Valid @RequestBody Email email) throws Exception {
        try {
            emailService.sendEmail(email);
        } catch (Exception e) {
            throw new Exception();
        }

    }
}
