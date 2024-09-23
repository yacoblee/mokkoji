package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.UserDTO;
import com.example.demo.entity.Member;
import com.example.demo.jwtToken.TokenProvider;
import com.example.demo.service.MemberService;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

	MemberService service;
	PasswordEncoder passwordEncoder;
	TokenProvider tokenProvider;
	
	
    @GetMapping("/logout")
    public ResponseEntity<?> Logout(HttpSession session) {
        log.info("** 로그아웃 확인 중 **");
        
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }
	
    // User Detail
    @GetMapping("/userdetail")
    public ResponseEntity<?> userdetail(HttpSession session,
    								@AuthenticationPrincipal String uesrid) {
    	// => userID: 인증받은 token 에서 get
        // => 요청 전달 : 스프링 시큐리티 필터 작동
        //    -> JwtAuthenticationFilter 클래스의 doFilterInternal() 메서드가 호출되어
        //    -> request 객체에서 token을 꺼내 분석하고, 인증되면
        //    -> SecurityContext에 인증된 Authentication 객체를 넣어두고 
    	//       현재 스레드내에서 공유되도록 관리하고 있으며, 
    	//    -> @AuthenticationPrincipal 으로 이 정보를 제공해줌.   
    	log.info("전달된 정보 확인: " + uesrid);
    	log.info("userDetail, session  에 보관된 정보 확인: " + session.getAttribute("loginID"));
    	
        // userID가 null 인지 확인
        if (uesrid == null) {
            log.info("AuthenticationPrincipal is null: 인증되지 않은 사용자.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("인증되지 않은 사용자입니다.");
        }
    	
    	System.out.println("entity data is "+uesrid);
    	Member entity = service.selectOne(uesrid);
    	if(entity!=null) {
    		return ResponseEntity.ok(entity);
    	}else {
    	
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
    						.body("userDetail failed ");
    	}
    }
    
 
	
 
	
	
	
}
