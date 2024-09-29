package com.example.mokkoji_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.service.smtp.SmtpEmailService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class SmtpController {

	private final SmtpEmailService service;


    @PostMapping("/send")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        try {
            service.sendMessage(to, subject, text);
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
	
}
