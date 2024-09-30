package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mypage")
@AllArgsConstructor
public class CartController {

	@Resource(name = "FavoritesService")
	private FavoritesService favoritesService;
	@Resource(name = "CartService")
	private CartService cartService;
	@Resource(name = "ReviewsService")
	private ReviewsService reviewsService;
	@Resource(name = "UsersService")
	private UsersService usersService;

	private TokenProvider tokenProvider;

	public String getUserIdFromHeader(String header) {
		return tokenProvider.validateAndGetUserId(header.substring(7));
	}

	// ** 장바구니 관련 =============================================================

	// 1) userId에 대한 장바구니 전체 최신순 조회
	@GetMapping("/cart")
//	public ResponseEntity<?> cartListAll(@AuthenticationPrincipal String userId) {
	public ResponseEntity<?> cartListAll(@RequestHeader("Authorization") String header) {
		// 1. 유효성 검사: userId가 null이거나 빈 값일 때
		//		if (userId == null || userId.isEmpty()) {
		//			log.warn("userId 확인 불가");
		//			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("userId 확인 불가");
		//		}
		// token에서 유효성 검사가 선행되기에 필요없음

		String userId = getUserIdFromHeader(header);
		log.info("userId : {}", userId);

		try {
			// 2. 찜 목록 조회
			List<CartDTO> cartDTOList = cartService.userCart(userId);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
			if (cartDTOList == null || cartDTOList.isEmpty()) {
				log.warn("장바구니가 비어있음");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니가 비어있음");
			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(cartDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : cartListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : cartListAll");
		}
	} //cartListAll

	// 장바구니 항목 삭제

}
