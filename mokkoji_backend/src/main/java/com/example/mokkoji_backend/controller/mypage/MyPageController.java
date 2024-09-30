package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
		log.info("userId : {}", userId);
		// 1. id에 맞는 사용자 정보 추출
		Users users = usersService.selectOne(userId);

		// 2. null 경우: 사용자 정보 조회 불가
		if (users == null) {
			log.warn("id에 맞는 user 없음");
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("id에 맞는 user 없음");
		}

		try {
			// 3. user 정보에 다른 정보들(찜, 장바구니 등)을 추가한 새로운 DTO 객체 생성
			int favoritesCnt = favoritesService.countFavorite(users.getUserId());
			int cartCnt = cartService.countCart(users.getUserId());

			MyPageDTO myPageDTO = MyPageDTO.builder()
					.userId(users.getUserId())
					.name(users.getName())
					.birthDate(users.getBirthDate())
					.gender(users.getGender())
					.phoneNumber(users.getPhoneNumber())
					.email(users.getEmail())
					.createdAt(users.getCreatedAt())
					.favoritesCnt(favoritesCnt)
					.cartCnt(cartCnt)
					.build();

			log.info(myPageDTO);

			// 4. 정상적인 경우
			return ResponseEntity.ok(myPageDTO);

		} catch (Exception e) {
			// 4. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : userDetail");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : userDetail");
		}
	} //userDetail

}
