package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

	private final CartService cartService;
	private final FavoritesService favoritesService;
	private final ReviewsService reviewsService;

	// ** 찜목록 관련 ===============================================

	// 1) 찜목록 전체 최신순 조회
	@GetMapping("/favorites")
	public ResponseEntity<?> favoritesListAll(String userId) {
		// 1. 유효성 검사: userId가 null이거나 빈 값일 때
		if (userId == null || userId.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("userId 확인 불가");
		}

		try {
			// 2. 찜 목록 조회
			List<Favorites> favoritesList = favoritesService.userFavorite(userId);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
			if (favoritesList == null || favoritesList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("찜목록이 비어있음");
			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(favoritesList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
		}
	} //favoritesListAll

	// 2) 찜목록에서 항목 삭제
	@GetMapping("/favorites/delete")
	public ResponseEntity<?> favoritesDelete(FavoritesId favoritesId) {
		// 1. 유효성 검사: favoritesId가 null일 때
		if (favoritesId == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("favoritesId 확인 불가");
		}

		try {
			// 2. 삭제할 항목이 존재하는지 확인


			// 3. 삭제 처리
			favoritesService.deleteFavorite(favoritesId);

			// 4. 삭제 성공 메시지 응답
			return ResponseEntity.ok("favorites 삭제 성공");

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
		}
	}

}
