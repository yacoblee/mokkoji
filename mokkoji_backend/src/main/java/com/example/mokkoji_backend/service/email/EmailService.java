package com.example.mokkoji_backend.service.email;

import java.util.Properties;
import java.util.Random;

import org.springframework.stereotype.Service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service("EmailService")
public class EmailService {
	private static final String HOST = "smtp.naver.com";
    private static final String USER = "mudsproject@naver.com";  // 네이버 계정 (보내는 이메일)
    private static final String PASSWORD = "6SS66EPVUDZR";      // 앱 비밀번호로 변경 필요
    private static final String FROM = "mudsproject@naver.com";  // 보내는 사람 이메일
    
    public void sendEmail(String recipientEmail, String subject, String body) {
        // SMTP 서버 속성 설정
        Properties properties = new Properties();
        properties.put("mail.smtp.host", HOST); // SMTP 서버명
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.transport.protocol", "smtp"); // SMTP 프로토콜만 사용
        properties.put("mail.debug", "true");

        // SMTP 인증
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USER, PASSWORD);
            }
        });

        try {
            System.out.println("### Preparing Message ###");

            // 이메일 메시지 생성
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(FROM));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
            message.setSubject(subject);
            message.setText(body);

            // 이메일 전송
            Transport.send(message);
            System.out.println("$$$$$$$$$$$$$$$$$$$$$$$ Email Sent successfully to: " + recipientEmail);

        } catch (MessagingException mex) {
            System.err.println("Error sending email: " + mex.getMessage());
            mex.printStackTrace();
        }
    }
    
    public String sendMail(String userEmail) {
    	  EmailService emailService = new EmailService();
    	  if(userEmail !=null) {
    		  String resultNum =randomNum();
    		   emailService.sendEmail(userEmail,"MUDS 비밀번호 변경 보안 코드 입니다.", " [MUDS] 인증번호"+resultNum +"\n 타인에게 절대 알려주지 마세요");  
    	 return resultNum;
    	  }else {
    		  System.out.println("User email not found for user ID: " + userEmail);
              return null;
          }
    }//sendMail
    
    public String randomNum() {
     	Random random = new Random();		//랜덤 함수 선언
    		int createNum = 0;  			//1자리 난수
    		String ranNum = ""; 			//1자리 난수 형변환 변수
            	int letter    = 6;			//난수 자릿수:6
    		String resultNum = "";  		//결과 난수
    		
    		for (int i=0; i<letter; i++) { 
                		
    			createNum = random.nextInt(9);		//0부터 9까지 올 수 있는 1자리 난수 생성
    			ranNum =  Integer.toString(createNum);  //1자리 난수를 String으로 형변환
    			resultNum += ranNum;			//생성된 난수(문자열)을 원하는 수(letter)만큼 더하며 나열
    		}	
    	
    	return  resultNum;
    }
    
}
