package com.example.demo.config;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


@Configuration
//=> 스프링에서 설정파일로 인식
//=> 기본적인 Bean  설정용
public class DemoConfig {

	
	
    @Bean
    PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

    
    // ** QueryDSL 사용을 위한 설정
    // => EntityManager

    @PersistenceContext
    private EntityManager entityManager;
    
    
    // => JPAQueryFactory를 Bean 등록하여 프로젝트 전역에서 QueryDSL을 작성할 수 있도록 함.
    // => EntityManager (i) 객체 주입 애너테이션
    // => SpringBoot JPA 에서는 엔티티 매니저 팩토리 관련 부분을 작성하지 않아도 생성 & 주입 해줌
    @Bean
    JPAQueryFactory jpaQueryFactory() {
	
    	return new JPAQueryFactory(entityManager);
    	
    };
    
    
    
    
    
    
} //class