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
import com.example.mokkoji_backend.domain.UserSendMailDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.service.email.EmailService;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.login.UsersService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@RestController
@Log4j2
@RequiredArgsConstructor
public class AdminUsersController {
	private final UsersService userService;
	private final AddressRepository addressRepository;
	private final AddressService addressService;
	private final EmailService emailService;
	
	
	@PostMapping("/administrator/users")
	public ResponseEntity<?> suchDB(@RequestBody PageRequestDTO requestDTO) {
		System.out.println("들어왔니?");
		log.info("********" + requestDTO);
		PageResultDTO<UsersDTO, Users> result = userService.findUserinfoToSearch(requestDTO);
		List<UsersDTO> dto = result.getDtoList();

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
	if(address.isEmpty()){
		return ResponseEntity.ok("주소가 존재하지 않습니다");
	}else {
		return ResponseEntity.ok(address);
		
	}
		
	}
		
	@PostMapping("/administrator/users/userinfo/userinfoupdate")
	public ResponseEntity<?> userinfoupdate(@RequestBody UserAndAddressDTO requestDTO) {
	    
	    List<Address> addr = requestDTO.getUserinfoAddress();
	    Users user = requestDTO.getUserinfo();

	    // 유저와 주소 정보가 유효한지 확인
	    if (addr != null && !addr.isEmpty() && user != null) {
	        // 유저 정보 업데이트
	        userService.userAdmimInfoUpdate(user);
	        // 주소 정보 업데이트
	        addressService.userAdmimAddressUpdate(addr);
	        return ResponseEntity.ok("저장됨");
	    } 
	    else {
	        // 유효하지 않은 입력에 대한 에러 처리
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효하지 않은 입력입니다.");
	    }
	}
	
	@PostMapping("/administrator/users/userinfo/isWithdrawn")
	public ResponseEntity<?> userinfoIsWithdrawn(@RequestBody UsersDTO requeseDTO){
		Users user = userService.selectOne(requeseDTO.getUserId()); 
		if(user.getUserId().equals(requeseDTO.getUserId()) && user.getIsWithdrawn()== 0) {
			user.setIsWithdrawn(1);
			user.setWithdrawalDate(requeseDTO.getWithdrawalDate());
			userService.userIsWithdrawnUpdate(user);	
			return ResponseEntity.ok("회원 탈퇴 완료");
		}else if(user.getIsWithdrawn()== 1) {
			user.setIsWithdrawn(0);
			user.setWithdrawalDate(null);
			userService.userIsWithdrawnUpdate(user);	
			return ResponseEntity.ok("회원 복구 완료");
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("유저를 찾을 수 없니다");
		}
	}
	
	
	@PostMapping("/administrator/users/userinfo/addressdelete")
	public ResponseEntity<?> userinfoAddressdelete (@RequestBody Address requeseDTO){
		int userAddressId = requeseDTO.getAddressId();
		
		if(userAddressId>=0) {
			addressService.deleteById(userAddressId);
			return ResponseEntity.ok("주소 삭제 완료");
		}else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주소를 찾을 수 없습니다");
		}
	}
	
	@PostMapping("/administrator/users/userinfo/sendMail")
	public ResponseEntity<?> adminSendMail(@RequestBody UserSendMailDTO requeseDTO){
		log.info("들어옴?");
		log.info(requeseDTO);
		if(requeseDTO.getEmail().size() == requeseDTO.getName().size() && !requeseDTO.getMailContent().isEmpty() &&!requeseDTO.getMailTitle().isEmpty()) {
			emailService.adminSendMail(requeseDTO);
			return ResponseEntity.ok("성공적으로 메일전송이 완료 되었습니다");			
		}else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("메일을 전송할 수 없습니다");
		}
	}


}

	

