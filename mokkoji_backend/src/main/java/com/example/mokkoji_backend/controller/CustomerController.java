package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.UsersService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@AllArgsConstructor
public class CustomerController {

	 private final  UsersService service;
	 private final TokenProvider tokenProvider;
	
 
	
	@PostMapping(value = "/test")
	public ResponseEntity<?> loginJwt(@RequestBody UsersDTO userDTO, HttpSession session){
		 
	 
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 비밀번호 오류");
		
	}
	
	
	
	
	
	
}
