package com.example.mokkoji_backend.config;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import lombok.Data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Configuration
@Data
public class NaverMainConfig {

	private static final String USER_EMAIL = "mudsproject@naver.com";
	private static final String USER_PASSWORD = "6SS66EPVUDZR";
	
	@Value("${sms.key}")
	private String smsKey;
	
	@Value("${sms.secretKey}")
	private String secretKey;
	
	@Value("${imp.api.key}")
	private String impkey;
	
	@Value("${imp.api.secretkey}")
	private String impsecretkey;

	
	@Primary
	@Bean(name = "naverEmailProperties")
	public Properties emailProperties() {
		Properties props = new Properties();
		props.put("mail.username", USER_EMAIL);
		props.put("mail.host", "smtp.naver.com");
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.debug", "true");
		props.put("mail.smtp.ssl.trust", "smtp.naver.com");
		props.put("mail.smtp.ssl.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		return props;
	}

	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.naver.com");
		mailSender.setPort(465);
		mailSender.setUsername(USER_EMAIL);
		mailSender.setPassword(USER_PASSWORD);
		
		Properties props = emailProperties();
		mailSender.setJavaMailProperties(props);
		System.out.println("*************** NaverConfig Props ***************** ");
		return mailSender;
	}

	@Component
	public static class SimpleAuthenticator extends Authenticator {
		@Override
		protected PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(USER_EMAIL, USER_PASSWORD);
		}
	}
}
