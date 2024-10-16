package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.UserAndAddressDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.repository.login.UsersDSLRepository;
import com.example.mokkoji_backend.service.CodeService;
import com.example.mokkoji_backend.service.goods.ProductImageService;
import com.example.mokkoji_backend.service.goods.ProductStatisticsService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@RestController
@Log4j2
@RequiredArgsConstructor
public class AdminUsersController {
	private final UsersService userService;
	private final AddressRepository addressRepository;
	
	
	
	
	@PostMapping("/administrator/users")
	public ResponseEntity<?> suchDB(@RequestBody PageRequestDTO requestDTO) {
		System.out.println("들어왔니?");
		log.info("********" + requestDTO);
		PageResultDTO<UsersDTO, Users> result = userService.findUserinfoToSearch(requestDTO);
		List<UsersDTO> dto = result.getDtoList();
//		if(result == null) {
//			log.info("[suchDB] user is null");
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("허용된 검색 타입이 아닙니다.");
//		}
		int count = userService.countBy();
		log.info("$$ 서치 결과"+result);
	    Map<String, Object> response = new HashMap<>();
	    response.put("users", dto );
	    response.put("pageMaker", result);
	    response.put("count", count);
		return ResponseEntity.ok(response);
	}
	
	// 유저 주소 검색 
	@PostMapping("/administrator/users/address")
	public ResponseEntity<?> suchUsersAddress(@RequestBody UsersDTO requestDTO){
		log.info("주소 찾기 들어옴?" + requestDTO);
		List<Address> address = addressRepository.findByUserId(requestDTO.getUserId());  
		return ResponseEntity.ok(address);
	}
		
	@PostMapping("/administrator/users/userinfo/userinfoupdate")
	public ResponseEntity<?> userinfoupdate(@RequestBody UserAndAddressDTO requestDTO){
		log.info("update에 들어옴?");
		List<Address> addr =  requestDTO.getUserinfoAddress();
		Users user = requestDTO.getUserinfo();
		log.info(user);
		for (Address address : addr) {
			log.info(address);
		}
		return ResponseEntity.ok("들어옴");
	}
	
	@PostMapping("/administrator/users/userinfo/isWithdrawn")
	public ResponseEntity<?> userinfoIsWithdrawn(@RequestBody UsersDTO requeseDTO){
		Users user = userService.selectOne(requeseDTO.getUserId()); 
		if(user.getUserId().equals(requeseDTO.getUserId())) {
			user.setIsWithdrawn(1);
			log.info(user);
			return ResponseEntity.ok("회원 탈퇴 완료");
		}else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("유저를 찾을 수 없니다");
		}
	}
	
}
