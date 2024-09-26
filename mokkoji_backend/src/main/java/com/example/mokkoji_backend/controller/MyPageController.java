package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
		List<Favorites> favoritesList = favoritesService.userFavorite(userId);

		if (favoritesList != null && !favoritesList.isEmpty()) {
			return ResponseEntity.ok(favoritesList);
		} else {
			return ResponseEntity.notFound().build();
		} //if
	} //favoritesListAll

	// 2) 찜목록에서 항목 삭제
//	@GetMapping("/fave/delete")
//	public ResponseEntity<?> favoriteDelete(@AuthenticationPrincipal FavoritesId favoriteId) {
//		favoriteService.deleteFavorite(favoriteId);
//	}

}
