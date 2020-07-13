package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Email;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public interface EmailService {
    void sendEmail(Email email) throws MessagingException;
}
