package com.example.mokkoji_backend.controller;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;
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
	@Resource(name = "ReviewsService")
	private ReviewsService reviewsService;
	@Resource(name = "UsersService")
	private UsersService usersService;

	@GetMapping("/{id}")
	public ResponseEntity<?> saveUserData(@PathVariable("id") String id){
		try {
			// 2. 찜 목록 조회
			Users users = usersService.selectOne(id);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
			if (users == null ) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("id에 맞는 user 없음");
			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(users);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
		}
	}

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
			// 2. 삭제할 항목이 존재하는지 확인 + 삭제
			favoritesService.deleteFavorite(favoritesId);

			// 3. 삭제 성공 메시지 응답
			return ResponseEntity.ok("favorites 삭제 성공");

		} catch (Exception e) {
			// 4. deleteFavorite에서 발생한 예외 처리 : favoritesId에 해당하는 항목 없음
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
//		catch (Exception e) {
//			// 5. 서버에서 발생한 예외 처리
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류");
//		}
	} //favoritesDelete

}
