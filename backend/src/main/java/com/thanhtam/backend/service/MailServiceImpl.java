package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

@Service()
public class MailServiceImpl implements EmailService {
    @Value("${spring.mail.username}")
    String username;
    @Value("${spring.mail.password}")
    String password;


    @Override
    public void sendEmail(Email email) throws MessagingException {
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.allow8bitmime", "true");
        properties.setProperty("mail.smtps.allow8bitmime", "true");
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username, false));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("tamht298@gmail.com"));
        message.setSubject(email.getFromAddress() + " - " + email.getSubject());
        message.setContent(email.getBody(), "text/html");
        message.setSentDate(new Date());

        Transport.send(message);

    }
}
