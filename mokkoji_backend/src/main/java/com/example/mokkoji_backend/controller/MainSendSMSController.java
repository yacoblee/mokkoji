package com.example.mokkoji_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.service.smtp.SendMessageService;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
public class MainSendSMSController {
	
//	@Autowired
//	private SendMessageService messageService;
//	
//
//    @PostMapping("/sendsms")
//    public SingleMessageSentResponse sendOne(@RequestBody Map<String, String> data) {
//	  Message message = new Message();
//	  
//
//      String fromNumber = data.get("from");        
//      String messageText = data.get("text");
//	  
//	  
//	  
//      message.setFrom("01012341234");
//      message.setTo("01040529406");
//      message.setText("한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다.");
//
//      SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//      System.out.println(response);
//
//      return response;
//    }
	
}
