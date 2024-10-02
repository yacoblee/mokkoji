package com.example.mokkoji_backend.service.smtp;

import lombok.extern.log4j.Log4j2;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class SendMessageService {

	private static final String key= "NCSCEEW6NSW7MCON";
	private static final String secretKey= "IOJSPD6DQZYI219JTMRKAYGLWS9VL8QW";
	private static final String phoneNumber= "01040529406";
    private final DefaultMessageService messageService;
    
    public SendMessageService(){
        this.messageService = NurigoApp.INSTANCE.initialize(key, secretKey, "https://api.coolsms.co.kr");
    }
    
    
    public SingleMessageSentResponse sendOne(SingleMessageSendingRequest request){
    	try {
            SingleMessageSentResponse response = this.messageService.sendOne(request);
            
            log.info("SMS 전송 성공: {}", response);
            return response;
        } catch (Exception e) {
           
            log.error("SMS 전송 실패: {}", e.getMessage());
            throw new RuntimeException("SMS 전송 중 오류가 발생했습니다.", e);
        }
    }
}
