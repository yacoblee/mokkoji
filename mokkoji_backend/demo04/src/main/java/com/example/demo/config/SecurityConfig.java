package com.example.demo.config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.jwtToken.JwtAuthenticationFilter;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

//** Spring_Boot Security
//=> 로그인 : Authentication(인증)
//=> API 사용권한 부여 : Authirization(인가)

//** Spring_Boot Security 인증 설정화일
//=> React Project 사용시 인증 설정에 사용됨
//=> React Project의 API 서버는 Ajax로 호출되기 때문에
//   기존의 페이지 요청과는 다른점이 있고 이를위한 설정이 필요함.
//  -> CORS 설정
//  -> 스프링 시큐리티는 Get방식 이외의 호출시에는
//     CSRF공격 방어를 위한 설정이 기본으로 활성화되어있으므로 이에대한 변경 필요함 
//  -> 아래 filterChain() 메서드 참고

//** SpringBoot Auto Configuration
//=> SpringBoot가 자동으로 설정해줌을 의미하며 이를 지원해주는 다양한 @ 들이 있음.

//** @EnableWebSecurity
//=> SpringBoot Auto Configuration @들 중의 하나이며, 손쉽게 Security 설정을 할수있도록해줌.
//   그러므로 설정파일을 의미하는 @Configuration 은 없어도 됨

 
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	

	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		//1) filter add 위치
//			http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);
			http.addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		//2) httpSercurity 빌더 작성 & return
			
			
		 return http.httpBasic(httpBasic -> httpBasic.disable()) // HTTP 기본 인증 비활성화
		        .formLogin(formLogin -> formLogin.disable()) // formLogin 비활성화
		        .logout(logout -> logout.disable()) // logout 비활성화
		        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
		        .cors(cors -> {}) // CORS 설정 활성화 (기본값)
		        .sessionManagement(session -> session
		            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성화 (무상태)
		        	.authorizeHttpRequests(auth -> auth
		            .requestMatchers("/auth/memberlist").hasRole("ADMIN")
		            .requestMatchers("/user/boardlist").hasRole("MANAGER")
		            .requestMatchers("/auth/userDetail","/auth/logout").hasRole("USER")
		            .anyRequest().permitAll()) // 모든 요청 인증 필요
		        .build();
	}//filterChain
  
    
    
} //class