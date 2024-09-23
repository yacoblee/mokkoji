package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/user")
@AllArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

	MemberService service;
	PasswordEncoder passwordEncoder;
	TokenProvider tokenProvider;
	
	
	// ** 로그인 확인 
    // => Session 체크해서 react state값 유지
    // => Session 객체는 각 User별로 관리됨 
    @GetMapping("/check-server")
    public ResponseEntity<?> checkLogin(HttpSession session) {
        log.info("** React_SpringBoot Connection 확인 중 **");
        return ResponseEntity.ok()
                .body(Map.of("checkLogin", "확인하지않음",
                             "checkData", "** ** Server 연결 성공, Port:8080 **"     
                        ));
        // => Map.of()
        //    - java 9 버전 부터 추가, 간편하게 초기화 가능
        //      map.put(1, "sangwoo kang"); map.put(2, "james kang"); put(3, "stef you");
        //      -> Map.of(key_1, "Value_sangwoo kang",
        //                2, "james kang",
        //                3, "stef you" )
        //    - 그러나 10개 까지만 초기화 가능 (10개 이상은 ofEntries() 사용)
        //    - unmodifiable(수정불가능) map을 리턴하므로 초기화후 수정불가능 (Immutable 객체)
        //    - 초기화 이후에 조회만 하는경우 주로사용함.(Key 관리 등)
    }
	
	// Login1 발행전 
	@PostMapping("/login01")
	public ResponseEntity<?> login01(@RequestBody Member entity, HttpSession session, Model model) {
		// 요청분석 - 들어오는 타입은 json 이고 기존 객체는 member 이기 때문에 RequestBody 가 자동 형변환을 행함
		String password = entity.getPassword();
		// service 처리 & 결과전송
		entity = service.selectOne(entity.getId());
		if(entity != null  &&
				passwordEncoder.matches(password, entity.getPassword())) {
				session.setAttribute("loginID", entity.getId());
				session.setAttribute("loginName", entity.getName());
				// builder패턴 적용 , 값 변경 예방을 위해 final 적용
				final UserDTO userDTO = UserDTO.builder()
										.id(entity.getId())
										.username(entity.getName())
										.build();
				log.info("로그인 성공 "+HttpStatus.OK);
				return ResponseEntity.ok(userDTO);
				
		}else {
			log.info("로그인 성공 "+HttpStatus.BAD_GATEWAY);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error Failed");
		}
		
		
	
	}// login
	
	// Login1 발행후 스프링 인증 전 단계
	@PostMapping("/login")
	public ResponseEntity<?> login02(@RequestBody Member entity, HttpSession session, Model model) throws Exception {
		// 요청분석 - 들어오는 타입은 json 이고 기존 객체는 member 이기 때문에 RequestBody 가 자동 형변환을 행함
		String password = entity.getPassword();
		// service 처리 & 결과전송
		entity = service.selectOne(entity.getId());
		if(entity != null  &&
				passwordEncoder.matches(password, entity.getPassword())) {
				
				session.setAttribute("loginID", entity.getId());
				session.setAttribute("loginName", entity.getName());
				// 성공시 toknen 생성
				final String token = tokenProvider.create(entity.getId());
				
				// builder패턴 적용 , 값 변경 예방을 위해 final 적용
				final UserDTO userDTO = UserDTO.builder()
										.token(token)
										.id(entity.getId())
										.username(entity.getName())
										.build();
				log.info("로그인 성공 "+HttpStatus.OK);
				return ResponseEntity.ok(userDTO);
				
		}else {
			log.info("로그인 성공 "+HttpStatus.BAD_GATEWAY);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error Failed");
		}
		
		
	
	}// login
	
	
	
}
