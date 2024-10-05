package com.example.mokkoji_backend.service.smtp;


import lombok.extern.log4j.Log4j2;
import net.nurigo.sdk.NurigoApp;

import org.springframework.stereotype.Service;

import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

 

@Service
@Log4j2
public class SendMessageService {

    // SMS API 키와 비밀 키 하드코딩 부분 유지
    private static final String smsKey = "NCSCEEW6NSW7MCON";
    private static final String smsSecretKey = "IOJSPD6DQZYI219JTMRKAYGLWS9VL8QW";
    private static final String apiUrl = "https://api.coolsms.co.kr";
    
    private DefaultMessageService messageService;

    public SendMessageService() {
        // 초기화 시점에 NurigoApp의 인스턴스를 생성하지 않음
        this.messageService = null; // 일단 null로 초기화
    }

    public void init() {
        try {
            this.messageService = NurigoApp.INSTANCE.initialize(smsKey, smsSecretKey, apiUrl);
            log.info("Message service initialized successfully.");
        } catch (Exception e) {
            log.error("Failed to initialize message service: {}", e.getMessage(), e);
            throw new RuntimeException("SMS 서비스 초기화 중 오류가 발생했습니다.", e);
        }
    }

    public SingleMessageSentResponse sendOne(SingleMessageSendingRequest request) {
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
