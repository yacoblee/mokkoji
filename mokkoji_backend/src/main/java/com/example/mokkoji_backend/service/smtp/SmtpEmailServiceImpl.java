package com.example.mokkoji_backend.service.smtp;

 

 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.config.NaverMainConfig;
import com.example.mokkoji_backend.domain.EmailRendererDTO;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SmtpEmailServiceImpl implements SmtpEmailService{
	
	

	@Autowired
    private final JavaMailSender emailSender;
	
//	@Qualifier("naverEmailProperties")
//    private final Properties props;
//    private final NaverMainConfig.SimpleAuthenticator authenticator;
//	
//    public void sendMail(String title, String body, String toEmail){
//        //  JavaMail 세션은 실제 네트워크 연결 세션과는 다름. 정보를 담고 있는 객체
//        Session session = Session.getInstance(props, authenticator);
//
//        try {
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(props.getProperty("mail.username")));
//            //TO 수신자, CC 참조, BCC 숨은 참조
//            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
//             
//            message.setSubject(title);
//            message.setText(body);
//           // Transport 클래스의 정적 send 메소드는 메시지를 보낸 후에 자동으로 연결을 종료 ->close 별도로 필요 없음.
//            Transport.send(message);
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        }
//    }
    
    
    
  
    
    @Override
    public void sendMessage(String to, String subject, String text) {
    	 SimpleMailMessage message = new SimpleMailMessage(); 
         message.setFrom("yacobleee@naver.com");  
         message.setTo(to);  
         message.setSubject(subject); 
         message.setText(text);
         emailSender.send(message);
    	
    }

}
