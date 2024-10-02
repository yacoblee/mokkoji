package com.example.mokkoji_backend.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RestController;

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
