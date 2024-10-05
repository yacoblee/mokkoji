package com.example.mokkoji_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.service.smtp.SendMessageService;
import com.example.mokkoji_backend.service.smtp.SmtpEmailService;
import com.example.mokkoji_backend.service.smtp.SmtpEmailServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;

@Log4j2
@RestController
@RequiredArgsConstructor
public class SmtpController {

	private final SmtpEmailServiceImpl service;
	
	
	@Autowired
	private SendMessageService messageService;
	

    @PostMapping("/sendsms")
    public SingleMessageSentResponse sendOne(@RequestBody Map<String, String> data) {
	  Message message = new Message();
	  

      String fromNumber = data.get("from");        
      String messageText = data.get("text");
	  
      message.setTo("01040529406");
      message.setFrom(fromNumber);
      message.setText(messageText);

      SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
      
      System.out.println(response);

      return response;
    }

    @PostMapping("/sendmail")
    public String sendEmail(@RequestBody Map<String,String> data) {
        try {
     
        	String to = data.get("content_mail");
        	String subject = data.get("content_main");
        	String text = data.get("content_name");
        	log.info("Send Mail INFORMATION : "+data );
        	service.sendMessage(to, subject, text);

        	
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
	
}
