package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.service.smtp.SendMessageService;
import com.example.mokkoji_backend.service.smtp.SmtpEmailServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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
      String messageText = data.get("content_name")+":"+data.get("text");
    		  
      message.setTo("01040529406");
      message.setFrom(fromNumber);
      message.setText(messageText);

      System.out.println(message);
      SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
      
      System.out.println(response);

      return response;
    }

    @PostMapping("/sendmail")
    public ResponseEntity<?> sendEmail(@RequestBody Map<String,String> data) {
        try {
     
        	String to = data.get("content_mail");
        	String subject = data.get("content_main") + to;
        	String text = data.get("content_name");
 
        	
        	service.sendMessage(subject, text);

        	log.info("Send Mail INFORMATION : "+data );
        	
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
        	log.info("Failed "+e.toString());
            return ResponseEntity.ok("Failed");
        }
    }
	
}
