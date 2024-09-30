package com.example.mokkoji_backend.service.smtp;

 

 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.config.NaverMainConfig;
import com.example.mokkoji_backend.domain.EmailRendererDTO;
import com.example.mokkoji_backend.domain.SmtpDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SmtpEmailServiceImpl implements SmtpEmailService{
	
	
	@Autowired
    private final JavaMailSender emailSender;
 
  
    @Override
    public void sendMessage(String from, String subject, String name) {
    	 SimpleMailMessage message = new SimpleMailMessage(); 
    	 message.setFrom("yacobleee@naver.com");  // 발신자 
         message.setTo("yacobleee@naver.com");  // 받는사람
         message.setSubject(name);  // 제목 
         message.setText(subject); // 내용 
    
         emailSender.send(message);
    	
    }

}
