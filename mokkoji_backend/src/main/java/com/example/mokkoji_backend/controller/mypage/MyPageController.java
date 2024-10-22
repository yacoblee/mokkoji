package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import jakarta.annotation.Resource;
import jakarta.persistence.NoResultException;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mypage")
@AllArgsConstructor
public class MyPageController {

	@Resource(name = "FavoritesService")
	private FavoritesService favoritesService;
	@Resource(name = "CartService")
	private CartService cartService;
	@Resource(name = "UsersService")
	private UsersService usersService;
	@Resource(name = "AddressService")
	private AddressService addressService;

	private TokenProvider tokenProvider;

	public String getUserIdFromHeader(String header) {
		return tokenProvider.validateAndGetUserId(header.substring(7));
	}

	// ** 기본 세팅 관련 ============================================================

	// 1) 사용자 상세 정보 조회
	@GetMapping("/user")
//	public ResponseEntity<?> userDetail(@AuthenticationPrincipal String userId) {
	public ResponseEntity<?> userDetail(@RequestHeader("Authorization") String header) {
		String userId = getUserIdFromHeader(header);

		try {
			MyPageDTO myPageDTO = usersService.findUser(userId);

			// 4. 정상적인 경우
			return ResponseEntity.ok(myPageDTO);

		} catch (NoResultException e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("MyPageDTO 오류 : findUser");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("MyPageDTO 오류 : findUser");
		} catch (Exception e) {
			// 6. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : userDetail");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : userDetail");
		}
	} //userDetail

	// 2.2) 수정
	@PatchMapping("/set")
	public ResponseEntity<?> userUpdate(@RequestHeader("Authorization") String header, @RequestBody MyPageDTO myPageDTO) {
		String userId = getUserIdFromHeader(header);

		// 1. RequestBody에서 전화번호와 이메일 추출
		String phoneNumber = myPageDTO.getPhoneNumber();
		String email = myPageDTO.getEmail();

		try {
			// 2. 추출한 전화번호와 이메일을 DB에 업데이트
			usersService.updateUser(userId, phoneNumber, email);

			// 3. 업데이트된 사용자 정보를 불러오기
			myPageDTO = usersService.findUser(userId);

			return ResponseEntity.ok(myPageDTO);

		} catch (NoResultException e) {
			// 4. 서버에서 발생한 예외 처리
			log.warn("MyPageDTO 오류 : findUser");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("MyPageDTO 오류 : findUser");
		}  catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : userUpdate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : userUpdate");
		}
	}
	
	// 2.3. 비밀번호 호출
	

	
	// 3. 주소지 관련
	// 3.1. 주소지 리스트 뽑아오기
	@GetMapping("/address")
	public ResponseEntity<?> addressList(@RequestHeader("Authorization") String header) {
		String userId = getUserIdFromHeader(header);

		try {
			// 1. Address List 불러오기
			List<Address> addressList = addressService.findUserAddress(userId);
			log.info(addressList);
			return ResponseEntity.ok(addressList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : addressList");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : addressList");
		}
	}
	
	// 3.2. 주소지 수정
	@PatchMapping("/address")
	public ResponseEntity<?> addressUpdate(@RequestHeader("Authorization") String header, @RequestBody Address address) {
		String userId = getUserIdFromHeader(header);

		try {
			List<Address> addressList = addressService.updateAddress(
					address.getPostalCode(),
					address.getStreetAddress(),
					address.getDetailedAddress(),
					address.getLocationName(),
					address.getRecipientName(),
					address.getRecipientPhone(),
					userId,
					address.getIsDefault(),
					address.getAddressId()
			);

			return ResponseEntity.ok(addressList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : addressUpdate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : addressUpdate");
		}
	}
	
	// 3.3. 기본 주소지 변경
	@PatchMapping("/address/{addressId}")
	public ResponseEntity<?> addressDefaultUpdate(@RequestHeader("Authorization") String header, @PathVariable int addressId) {
		String userId = getUserIdFromHeader(header);

		try {
			List<Address> addressList = addressService.changeDefaultAddress(userId, addressId);
			return ResponseEntity.ok(addressList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : addressDefaultUpdate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : addressDefaultUpdate");
		}
	}
	
	// 3.4. 주소지 삭제
	@DeleteMapping("/address/{addressId}")
	public ResponseEntity<?> addressDelete(@RequestHeader("Authorization") String header, @PathVariable int addressId) {
		String userId = getUserIdFromHeader(header);

		try {
			List<Address> addressList = addressService.deleteAddress(userId, addressId);
			return ResponseEntity.ok(addressList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : addressDelete");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : addressDelete");
		}
	}

	// 3.5. 주소지 입력
	@PostMapping("/address")
	public ResponseEntity<?> addressCreate(@RequestHeader("Authorization") String header, @RequestBody Address address) {
		String userId = getUserIdFromHeader(header);

		try {
			List<Address> addressList = addressService.createInsertAddress(userId, address.getPostalCode(), address.getStreetAddress(), address.getDetailedAddress(),address.getLocationName(),address.getRecipientPhone(),address.getRecipientName());
			return ResponseEntity.ok(addressList);
		} catch (Exception e) {
			log.warn("내부 서버 오류 : addressCreate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : addressCreate");
		}}
}
