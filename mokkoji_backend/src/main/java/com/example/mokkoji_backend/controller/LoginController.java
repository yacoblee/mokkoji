package com.example.mokkoji_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.service.login.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/users")
public class LoginController {
	@Autowired
	private UsersService service;

	  @PostMapping("/Login") 
	public ResponseEntity<?> checkLogin(@RequestBody Users entity, HttpSession session) {
		System.out.println("****서버 연결됨 ?");
		  String pw = entity.getPassword();
		entity = service.selectOne(entity.getUserId());
		if (entity != null && pw != null) {
			session.setAttribute("loginID", entity.getUserId());
			session.setAttribute("loginPW", entity.getPassword());
			final UsersDTO user = UsersDTO.builder()
									.userId(entity.getUserId())
									.name(entity.getPassword())
									.build();
			
			return ResponseEntity.ok(user);
		}else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 password가 오류. entity =>" +entity);
		}//checkLogin
	}

}
