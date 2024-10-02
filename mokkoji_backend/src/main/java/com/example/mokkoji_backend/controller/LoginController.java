package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.login.UsersService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@AllArgsConstructor
public class LoginController {

	private final UsersService service;
	private final AddressService aservice;
	private final TokenProvider tokenProvider;
	PasswordEncoder passwordEncoder;

	@PostMapping(value = "/Login")
	public ResponseEntity<?> loginJwt(@RequestBody UsersDTO userDTO, HttpSession session) {

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

	}

	@PostMapping(value = "/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("로그아웃 성공");

	}// logout

	@PostMapping(value = "/Login/Membership")
	public ResponseEntity<?> membership(@RequestBody UsersDTO userDTO, HttpSession session, Users entity,
			Address address) {
		System.out.println("저장" + userDTO);
		entity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		entity.setName(userDTO.getName());
		entity.setUserId(userDTO.getUserId());
		entity.setGender(userDTO.getGender());
		entity.setPhoneNumber(userDTO.getPhoneNumber());
		entity.setEmail(userDTO.getEmail());
		entity.setBirthDate(userDTO.getBirthDate());
		entity.setCreatedAt(userDTO.getCreatedAt());
		entity.setIsAdmin(userDTO.getIsAdmin() != null ? userDTO.getIsAdmin() : "0");
		service.register(entity);

		address.setUserId(userDTO.getUserId());
		address.setPostalCode(userDTO.getPostalCode());
		address.setStreetAddress(userDTO.getStreetAddress());
		address.setDetailedAddress(userDTO.getDetailedAddress());
		address.setRecipientPhone(userDTO.getPhoneNumber());
		address.setCreated_at(userDTO.getCreatedAt());
		aservice.register(address);

		return ResponseEntity.ok("회원가입이 완료되었습니다.");
	}//membership

	@PostMapping(value = "/Login/selectOne")
	public ResponseEntity<?> selectOne(@RequestBody UsersDTO usersDTO, Users dto) {
		System.out.println("아이디 찾기" + usersDTO);
		dto = service.selectOne(usersDTO.getUserId());
		if (dto.getUserId().equals(usersDTO.getUserId())) {
			return ResponseEntity.ok("false");
		} else {
			return ResponseEntity.ok("true");
		}
	}// selectOne

	@PostMapping(value = "/Login/FindId")
	public ResponseEntity<?> findId(@RequestBody UsersDTO usersDTO, HttpSession session, Users dto) {
		dto = service.findById(usersDTO.getName(), usersDTO.getPhoneNumber());
		if (dto != null) {
			return ResponseEntity.ok(dto.getUserId());
		} else {
			return ResponseEntity.ok("false");
		}
	}//findId
}
