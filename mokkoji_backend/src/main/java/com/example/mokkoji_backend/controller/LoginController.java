package com.example.mokkoji_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.service.login.UsersService;

import jakarta.servlet.http.HttpSession;

@RestController

public class LoginController {
	@Autowired
	private UsersService service;

	@PostMapping("/Login")
	public ResponseEntity<?> checkLogin(@RequestBody Users entity, HttpSession session) {

		System.out.println("****서버 연결됨 ?");
		String pw = entity.getPassword();
		entity = service.selectOne(entity.getUserId());
		if (entity.getUserId() != null && pw != null) {
			session.setAttribute("loginID", entity.getUserId());
			session.setAttribute("loginPW", entity.getPassword());
			final UsersDTO user = UsersDTO.builder().userId(entity.getUserId()).name(entity.getName()).build();
		System.out.println(ResponseEntity.ok(user));
			return ResponseEntity.ok(user);
		} else {
			System.out.println("****아이디 비번 다름");
	   return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
	                .header("Content-Type", "application/json")
	                .body("id 또는 password가 오류. entity =>");
		} // checkLogin

//		  System.out.println("****서버 연결됨 ?");
//		  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		  String password = entity.getPassword();
//		  String passwordEncoding = passwordEncoder.encode(password);
//		  Users dbUser = service.selectOne(entity.getUserId());
//		  
//		  if(dbUser != null && passwordEncoder.matches(passwordEncoding, password)) {
//			  session.setAttribute("loginID", entity.getUserId());
//			  session.setAttribute("loginName", entity.getName());
//		  final UsersDTO user = UsersDTO.builder()
//				  					.userId(entity.getUserId())
//				  					.name(entity.getName())
//				  					.build();
//		  
//		  return ResponseEntity.ok(user);
//		  
//		  }else {
//			  return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 password가 오류. entity =>");
//		  }

	}

}
