package com.example.mokkoji_backend.controller;

 

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

//	private final CartServiceImpl cartService;
//	//private final FavoritesService favoritesService;
//	private final ReviewsServiceImpl reviewsService;

	// ** 찜목록 관련 ===============================================

//	// 1) 찜목록 전체 최신순 조회
//	@GetMapping("/favorites")
//	public ResponseEntity<?> favoritesListAll(String userId) {
//		// 1. 유효성 검사: userId가 null이거나 빈 값일 때
//		if (userId == null || userId.isEmpty()) {
//			return ResponseEntity.badRequest().body("400 : userId 확인 불가(null or empty)");
//		}
//
//		try {
//			// 2. 찜 목록 조회
//			List<Favorites> favoritesList = favoritesService.userFavorite(userId);
//
//			// 3. null인 경우: 사용자 데이터가 없거나 찜 목록 조회 불가
//			if (favoritesList == null) {
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("404 : favorites 확인 불가(null)");
//			}
//
//			// 4. 목록이 비어 있는 경우: 사용자가 상품을 추가하지 않은 상태
//			if (favoritesList.isEmpty()) {
//				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("204 : favorites 없음(empty)");
//			}
//
//			// 5. 정상적인 경우
//			return ResponseEntity.ok(favoritesList);
//
//		} catch (Exception e) {
//			// 5. 서버에서 발생한 예외 처리
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 : Server에 연결할 수 없음");
//		}
//	} //favoritesListAll
//
//	// 2) 찜목록에서 항목 삭제
//	@GetMapping("/favorites/delete")
//	public ResponseEntity<?> favoritesDelete(FavoritesId favoritesId) {
//		// 1. 유효성 검사: favoritesId가 null일 때
//		if (favoritesId == null) {
//			return ResponseEntity.badRequest().body("Invalid favoritesId");
//		}
//
//		try {
//			// 2. 삭제할 항목이 존재하는지 확인
//			boolean exists = favoritesService.existsById(favoritesId);
//			if (!exists) {
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorite not found");
//			}
//
//			// 3. 삭제 처리
//			favoritesService.deleteFavorite(favoritesId);
//
//			// 4. 삭제 성공 메시지 응답
//			return ResponseEntity.ok("Favorite deleted successfully");
//
//		} catch (Exception e) {
//			// 5. 서버에서 발생한 예외 처리
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the favorite.");
//		}
//	} //favoritesDelete

}
