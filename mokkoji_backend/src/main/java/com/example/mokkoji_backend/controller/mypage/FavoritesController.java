package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
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

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mypage")
@AllArgsConstructor
public class FavoritesController {

	@Resource(name = "FavoritesService")
	private FavoritesService favoritesService;
	@Resource(name = "CartService")
	private CartService cartService;
	@Resource(name = "ReviewsService")
	private ReviewsService reviewsService;
	@Resource(name = "UsersService")
	private UsersService usersService;

	// ** 기본 세팅 관련 ============================================================

	// 1) userId에 해당하는 favorites 최신순
	@GetMapping("/favorites")
	public ResponseEntity<?> favoritesListAll(@AuthenticationPrincipal String userId) {
		// 1. 유효성 검사: userId가 null이거나 빈 값일 때
//		if (userId == null || userId.isEmpty()) {
//			log.warn("userId 확인 불가");
//			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("userId 확인 불가");
//		}
		// token에서 유효성 검사가 선행되기에 필요없음

		try {
			// 2. 찜 목록 조회
			List<Favorites> favoritesList = favoritesService.userFavorite(userId);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
			if (favoritesList == null || favoritesList.isEmpty()) {
				log.warn("찜목록이 비어있음");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("찜목록이 비어있음");
			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(favoritesList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : favoritesListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : favoritesListAll");
		}
	} //favoritesListAll

	// 2) 찜목록 삭제
	// 2.1) 단일 상품 삭제
	@DeleteMapping("/favorites/delete/{productId}")
	public ResponseEntity<?> favoritesDeleteOne(@AuthenticationPrincipal String userId, @PathVariable long productId) {

		FavoritesId favoritesId = new FavoritesId(userId, productId);

		// 1. 유효성 검사: favoritesId가 null일 때
		if (favoritesId == null) {
			log.warn("favoritesId 확인 불가");
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("favoritesId 확인 불가");
		}

		try {
			// 2. 삭제할 항목이 존재하는지 확인 + 삭제
			favoritesService.deleteFavorite(favoritesId);

			// 3. 삭제 성공 메시지 응답
			return ResponseEntity.ok("favorites 삭제 성공");

		} catch (Exception e) {
			// 4. deleteFavorite에서 발생한 예외 처리 : favoritesId에 해당하는 항목 없음
			log.warn("favoritesId에 해당하는 항목 없음");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("favoritesId에 해당하는 항목 없음");
		}
		//		catch (Exception e) {
		//			// 5. 서버에서 발생한 예외 처리
		//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
		//		}
	} //favoritesDelete

	// 2.2) 체크 상품 삭제
	@DeleteMapping("")
	public ResponseEntity<?> favoritesDeleteMulti(@AuthenticationPrincipal String userId, @RequestBody List<Long> productIdList) {
		// 1. 유효성 검사: productId 목록이 null이거나 비어있을때
		if (productIdList == null || productIdList.isEmpty()) {
			log.warn("productId 목록 확인 불가");
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("productId 목록 확인 불가");
		}

		// 2. favoritesId에 대한 List 생성 : 반복문 사용
		List<FavoritesId> favoritesIdList = new ArrayList<>();

		for (Long productId : productIdList) {
			FavoritesId favoritesId = new FavoritesId(userId, productId);
			favoritesIdList.add(favoritesId);
		}

		try {
			// 3. favoritesId에 대해 삭제 실행 : 반복문 사용
			for (FavoritesId favoritesId : favoritesIdList) {
				favoritesService.deleteFavorite(favoritesId);
			}

			return ResponseEntity.ok("favoritesList 삭제 성공");

		} catch (Exception e) {
			// 4. deleteFavorite에서 발생한 예외 처리 : favoritesId에 해당하는 항목 없음
			log.warn("favoritesId에 해당하는 항목 없음");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("favoritesId에 해당하는 항목 없음");
		}

	}

}
