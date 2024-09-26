package com.example.mokkoji_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.service.login.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
public class LoginController {
	@Autowired
	private UsersService service;

//	@PostMapping("/Login")
//	public ResponseEntity<?> checkLogin(@RequestBody Users entity, HttpSession session, UsersDTO userDTO ) {
//
//		System.out.println("****서버 연결됨 ?");
//		String pw = entity.getPassword();
//		entity = service.selectOne(entity.getUserId());
//		if (entity.getUserId() != null && pw != null) {
//			session.setAttribute("loginID", entity.getUserId());
//			session.setAttribute("loginPW", entity.getPassword());
//			final UsersDTO user = UsersDTO.builder().userId(entity.getUserId()).name(entity.getName()).build();
//		System.out.println(ResponseEntity.ok(user));
//			return ResponseEntity.ok(user);
//		} else {
//			System.out.println("****아이디 비번 다름");
//	   return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
//	                .header("Content-Type", "application/json")
//	                .body("id 또는 password가 오류. entity =>");
//		} 
//	}// checkLogin
//	@PostMapping("/Login")
//	public ResponseEntity<?> checkLogin(@RequestBody UsersDTO userDTO, HttpSession session) {
//
//	    System.out.println("****서버 연결됨 ?");
//	    String inputPw = userDTO.getPassword();  // 입력된 비밀번호
//	    Users entity = service.selectOne(userDTO.getUserId());  // DB에서 사용자 정보 조회
//
//	    if (entity == null) {
//	        System.out.println("****해당 유저가 존재하지 않습니다");
//	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                             .header("Content-Type", "application/json")
//	                             .body("해당 유저를 찾을 수 없습니다.");
//	    }
//
//	    // 입력된 비밀번호와 DB 비밀번호 비교
//	    System.out.println("입력된 비밀번호: " + inputPw);
//	    System.out.println("DB에 저장된 비밀번호: " + entity.getPassword());
//
//	    if (entity.getUserId() != null && inputPw.equals(entity.getPassword())) {
//	        session.setAttribute("loginID", entity.getUserId());
//	        session.setAttribute("loginPW", entity.getPassword());
//
//	        UsersDTO user = UsersDTO.builder()
//	                                .userId(entity.getUserId())
//	                                .name(entity.getName())
//	                                .build();
//
//	        System.out.println("로그인 성공: " + ResponseEntity.ok(user));
//	        return ResponseEntity.ok(user);
//	    } else {
//	        System.out.println("****아이디 또는 비밀번호가 다릅니다");
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                             .header("Content-Type", "application/json")
//	                             .body("아이디 또는 비밀번호가 일치하지 않습니다.");
//	    }
//	}
	
	@PostMapping(value = "/Login")
	public ResponseEntity<?> checkLogin(@RequestBody UsersDTO userDTO, HttpSession session) {
		Users entity = service.selectOne(userDTO.getUserId());
		String inputPw = userDTO.getPassword();
		if(entity !=null && inputPw.equals(entity.getPassword())) {
			
			UsersDTO user = UsersDTO.builder()
								.userId(entity.getUserId())
								.name(entity.getName())
								.build();
			
			return ResponseEntity.ok(user);
		}else {
			System.out.println("****아이디 비번 다름");
			   return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
			                .header("Content-Type", "application/json")
			                .body("id 또는 password가 오류. entity =>");
			   }
	}
	
	@PostMapping(value="/logout")
	      public ResponseEntity<String> logout(HttpSession session){
	         session.invalidate();
	         log.info("로그아웃 성공");
	         return ResponseEntity.ok("로그아웃 성공");
	         
	      }//logout
	
	
	
	
	
}
