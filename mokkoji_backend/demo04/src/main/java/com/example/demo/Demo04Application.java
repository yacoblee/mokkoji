package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing	//BaseEntity 참고:자동감지 리스너를 작도시켜줌
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class Demo04Application {

	public static void main(String[] args) {
		SpringApplication.run(Demo04Application.class, args);
	}

}