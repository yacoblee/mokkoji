package com.example.mokkoji_backend.service.smtp;


public interface SmtpEmailService {


	//public void sendMail(EmailRendererDTO dto);
	
	public void sendMessage(String subject, String name);
}
