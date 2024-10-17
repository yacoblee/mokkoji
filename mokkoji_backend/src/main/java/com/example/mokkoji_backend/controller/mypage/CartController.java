package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.entity.myPage.CartId;
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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

		try {
			// 2. 찜 목록 조회
			List<CartDTO> cartDTOList = cartService.userCart(userId);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
//			if (cartDTOList == null || cartDTOList.isEmpty()) {
//				log.warn("장바구니가 비어있음");
//				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니가 비어있음");
//			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(cartDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : cartListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : cartListAll");
		}
	} //cartListAll
	
	// 2) 장바구니 수량 수정
	@PatchMapping("/cart/{productId}/{optionContent}/{packagingOptionContent}/{productCnt}")
//	public ResponseEntity<?> cartUpdateCount(@AuthenticationPrincipal String userId, ) {
	public ResponseEntity<?> cartUpdateCount(@RequestHeader("Authorization") String header, @PathVariable long productId, @PathVariable String optionContent, @PathVariable String packagingOptionContent, @PathVariable int productCnt) {
		String userId = getUserIdFromHeader(header);

		log.info("{}, {}, {}, {}, {}", userId, productId, optionContent, packagingOptionContent, productCnt);

		try {
			// 수량 update 실행
			List<CartDTO> cartDTOList = cartService.updateCart(userId, productId, optionContent, packagingOptionContent, productCnt);

			return ResponseEntity.ok(cartDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : cartUpdateCount");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : cartUpdateCount");
		}

	}

	// 3) 장바구니 항목 삭제
	// 3.1) 개별 삭제
	@DeleteMapping("/cart/{productId}/{optionContent}/{packagingOptionContent}")
//	public ResponseEntity<?> cartDeleteOne(@AuthenticationPrincipal String userId, @PathVariable long productId) {
	public ResponseEntity<?> cartDeleteOne(@RequestHeader("Authorization") String header, @PathVariable long productId, @PathVariable String optionContent, @PathVariable String packagingOptionContent) {
		String userId = getUserIdFromHeader(header);
		log.info(userId);
		log.info(productId);
		log.info(optionContent);
		log.info(packagingOptionContent);

		CartId cartId = new CartId(userId, productId, optionContent, packagingOptionContent);

		// 1. 유효성 검사: cartId가 null일 때
		if (cartId == null) {
			log.warn("cartId 확인 불가");
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("cartId 확인 불가");
		}

		try {
			// 2. 삭제 실행
			cartService.deleteCart(cartId);

			// 3. 삭제 성공 후 다시 List 출력
			List<CartDTO> cartDTOList = cartService.userCart(userId);
			return ResponseEntity.ok(cartDTOList);

		} catch (Exception e) {
			// 4. deleteCartOne에서 발생한 예외 처리 : cartId에 해당하는 항목 없음
			log.warn("cartId에 해당하는 항목 없음");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("cartId에 해당하는 항목 없음");
		}
		//		catch (Exception e) {
		//			// 5. 서버에서 발생한 예외 처리
		//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
		//		}
	} //cartDeleteOne
	
	// 3.2) 체크 상품 삭제
	@DeleteMapping("/cart")
//	public ResponseEntity<?> cartDeleteCheck(@AuthenticationPrincipal String userId,) {
	public ResponseEntity<?> cartDeleteCheck(@RequestHeader("Authorization") String header, @RequestBody List<String> cartCheckList) {
		String userId = getUserIdFromHeader(header);

		// 1. 유효성 검사: cartCheckList 목록이 null이거나 비어있을때
		if (cartCheckList == null || cartCheckList.isEmpty()) {
			log.warn("cartCheckList 목록 확인 불가");
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("cartCheckList 목록 확인 불가");
		}

		// 2. CartId에 대한 List 생성 : 반복문 사용
		List<CartId> cartIdList = new ArrayList<>();

		for (String cartKey : cartCheckList){
			String[] cc = cartKey.split("-");

			CartId cartId = CartId.builder().userId(userId)
					.productId(Long.parseLong(cc[0]))
					.optionContent(cc[1])
					.packagingOptionContent(cc[2])
					.build();

			cartIdList.add(cartId);
		}

		try {
			// 3. cartId에 대해 삭제 실행 : 반복문 사용
			for (CartId cartId : cartIdList) {
				cartService.deleteCart(cartId);
			}

			// 4. 삭제 성공 후 다시 List 출력
			List<CartDTO> cartDTOList = cartService.userCart(userId);
			return ResponseEntity.ok(cartDTOList);

		} catch (Exception e) {
			// 4. deleteFavorite에서 발생한 예외 처리 : favoritesId에 해당하는 항목 없음
			log.warn("favoritesId에 해당하는 항목 없음");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("favoritesId에 해당하는 항목 없음");
		}

	}

}
