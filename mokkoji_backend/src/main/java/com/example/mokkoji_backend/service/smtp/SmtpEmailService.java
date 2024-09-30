package com.example.mokkoji_backend.service.smtp;


import com.example.mokkoji_backend.domain.EmailRendererDTO;


public interface SmtpEmailService {


	//public void sendMail(EmailRendererDTO dto);
	
	public void sendMessage(String to, String subject, String text);
}
