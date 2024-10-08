package com.example.mokkoji_backend.controller;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.email.EmailService;
import com.example.mokkoji_backend.service.login.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@AllArgsConstructor
public class LoginController {

	private final UsersService service;
	private final TokenProvider tokenProvider;
	PasswordEncoder passwordEncoder;
	private EmailService emailService;
	

	
	
	@PostMapping(value = "/Login")
	public ResponseEntity<?> loginJwt(@RequestBody UsersDTO userDTO) {

		String inputPssword = userDTO.getPassword();
		Users entity = service.selectOne(userDTO.getUserId());// 아이디 검증

		if (entity != null && inputPssword.equals(entity.getPassword())
				|| passwordEncoder.matches(inputPssword, entity.getPassword())) {
			// test를 위한 유저정보의 경우 passwordEncoder 미적용으로 비밀번호 확인을 위한 방법 2개임
			final String token = tokenProvider.jwtCreate(entity.getUserId());
			log.info("생성 토큰" + token);
			return ResponseEntity.ok(token);

		} else
			log.info("에러");
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 비밀번호 오류");
	}// loginJwt

	@PostMapping(value = "/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("로그아웃 성공");

	}// logout

	@PostMapping(value = "/Login/Membership")
	public ResponseEntity<?> membership(@RequestBody UsersDTO userDTO) {
		try {
			service.registerUserAndAddress(userDTO);
			return ResponseEntity.ok("true");
		} catch (Exception e) {
			// 기타 예외 처리
			log.error("회원가입 처리 중 오류 발생: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 처리 중 오류가 발생했습니다.");
		}
	}// membership

	@PostMapping(value = "/Login/selectOne")
	public ResponseEntity<?> idRedundancyCheck(@RequestBody UsersDTO usersDTO) {

		try {
			Users userEntity = service.selectOne(usersDTO.getUserId());
			if (userEntity.getUserId() != null) {
				log.error("회원가입이 불가합니다");
				return ResponseEntity.ok("false");
			} else {
				log.error("회원가입을 진행해주세요");
				return ResponseEntity.ok("true");
			}
		} catch (Exception e) {
			log.info("Exception 발생 " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("null");
		}

	}// idRedundancyCheck

	@PostMapping(value = "/Login/FindId")
	public ResponseEntity<?> findId(@RequestBody UsersDTO usersDTO, Users userEntity) {
		try {
			userEntity = service.findById(usersDTO.getName(), usersDTO.getPhoneNumber());
			return ResponseEntity.ok(userEntity.getUserId());
		} catch (NoSuchElementException e) {
			log.info("NoSuchElementException 발생 " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
		} catch (Exception e) {
			log.info("Exception 발생 " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("null");
		}
	}// findId

	@PostMapping(value = "/login/findPw")
	public ResponseEntity<?> findEmail(@RequestBody UsersDTO usersDTO) {
		log.info("비번 찾기 들어옴");

		Users entity = service.findByUserIdAndPhoneNumber(usersDTO.getUserId(), usersDTO.getPhoneNumber());
		if (entity != null) {
			emailService.sendMail(entity.getEmail());

			if (emailService.getVerificationCode() != null) {
				log.info("1. 세션에 코드 저장: " + emailService.getVerificationCode());
				UsersDTO newusersDTO = UsersDTO.builder()
	                      .userId(usersDTO.getUserId())
	                      .phoneNumber(usersDTO.getPhoneNumber())
	                      .userCode(emailService.getVerificationCode())
	                      .build();
									
				//return ResponseEntity.ok("인증번호: " + emailService.getVerificationCode()+usersDTO.getUserId(),usersDTO.getPhoneNumber());
				return ResponseEntity.ok(newusersDTO);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("null");
			}
		} else {
			return ResponseEntity.ok("false");
		}
	}// findPw

	@PostMapping(value = "/login/findPw/verifyCode")
	public ResponseEntity<?> checkVerifyCode(@RequestBody UsersDTO usersDTO) {
		log.info("2. 코드 인증 들어옴");
		log.info("2. 유저가 입력한 코드: " + usersDTO.getUserCode());
		log.info("2. 이메일로 발송된 코드 : " + emailService.getVerificationCode());
		if (emailService.getVerificationCode().equals(usersDTO.getUserCode())) {
			return ResponseEntity.ok("인증번호 일치");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("인증번호 불일치");
		}

	}//checkVerifyCode
	
	
	
	@PostMapping(value = "/login/findPw/verifyCode/resetPassword")
	public ResponseEntity<?> passwordUpdate(@RequestBody UsersDTO usersDTO, Users userEntity) {
		log.info("유저 입력값" + usersDTO);
		
		try {
			service.updatePassword(usersDTO.getUserId(), passwordEncoder.encode(usersDTO.getPassword()),LocalDateTime.now());
			log.info("비밀번호 변경완료");
			return ResponseEntity.ok("변경완료");
		}catch(Exception e) {
			log.error("password save (update) 실패 !"+e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("실패");
			
		}
		
	}//
	
	

}
