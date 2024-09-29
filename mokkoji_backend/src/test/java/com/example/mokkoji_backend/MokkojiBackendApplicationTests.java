package com.example.mokkoji_backend;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.boot.test.mock.mockito.MockBean;
 
import com.example.mokkoji_backend.service.smtp.SmtpEmailServiceImpl;

import static org.mockito.Mockito.*;

@SpringBootTest
class MokkojiBackendApplicationTests {

	@Autowired
    private JavaMailSender javaMailSender;  // JavaMailSender를 MockBean으로 주입

    @Autowired
    private SmtpEmailServiceImpl emailService;  // 실제 메일 서비스 구현체 주입

    @Test
    public void testSendEmail() {
        // Given
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("yacobleee@naver.com");
        message.setSubject("Test Subject");
        message.setText("Test Message");

        // When
        emailService.sendMessage("yacobleee@naver.com", "Test Subject", "Test Message");
        System.out.println("Email sent successfully.");
        // Then
        // 특정 클래스의 인스턴스가 호출되었는지 확인
        //verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class)); 
    }
}
