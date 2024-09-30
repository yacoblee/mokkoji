package com.example.mokkoji_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@AllArgsConstructor
public class LoginController {

	 private final  UsersService service;
	 private final TokenProvider tokenProvider;
	
//	@PostMapping(value = "/Login02")
//	public ResponseEntity<?> checkLogin(@RequestBody UsersDTO userDTO, HttpSession session) {
//		Users entity = service.selectOne(userDTO.getUserId());
//		String inputPw = userDTO.getPassword();
//		if(entity !=null && inputPw.equals(entity.getPassword())) {
//			
//			UsersDTO user = UsersDTO.builder()
//								.userId(entity.getUserId())
//								.name(entity.getName())
//								.build();
//			
//			return ResponseEntity.ok(user);
//		}else {
//			System.out.println("****아이디 비번 다름");
//			   return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
//			                .header("Content-Type", "application/json")
//			                .body("id 또는 password가 오류. entity =>");
//			   }
//	}//validateAndGetUserId
	
	
	@PostMapping(value = "/Login")
	public ResponseEntity<?> loginJwt(@RequestBody UsersDTO userDTO, HttpSession session){
		
		String inputPssword = userDTO.getPassword();
		Users entity = service.selectOne(userDTO.getUserId());// 아이디 검증

		if(entity!=null && inputPssword.equals(entity.getPassword())) {
			final String token = tokenProvider.jwtCreate(entity.getUserId());
			log.info("생성 토큰"+token);
			
			final UsersDTO user = UsersDTO.builder()
										.token(token)
										.userId(entity.getUserId())
										.name(entity.getName())
										.build();
			return ResponseEntity.ok(user);
										
		}else  log.info("에러");
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 비밀번호 오류");
		
	}
	
	
	
	
	
	@PostMapping(value="/logout")
	      public ResponseEntity<String> logout(HttpSession session){
	         session.invalidate();
	         log.info("로그아웃 성공");
	         return ResponseEntity.ok("로그아웃 성공");
	         
	      }//logout
	
	
	
  @PostMapping(value = "/Membership")
  public ResponseEntity<?> membership(@RequestBody UsersDTO userDTO, HttpSession session){
	  log.info("회원가입 들어옴?");
	  
	  return ResponseEntity.ok("");
	  
  }
  
  
	
}
