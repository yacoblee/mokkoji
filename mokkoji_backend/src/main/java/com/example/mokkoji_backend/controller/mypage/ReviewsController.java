package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.ReviewsDTO;
import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
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
public class ReviewsController {

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

	// =====================================================

	// 1) Review 목록 호출
	@GetMapping("/review")
	public ResponseEntity<?> reviewsListAll(@RequestHeader("Authorization") String header) {
		String userId = getUserIdFromHeader(header);

		try {
			// 2. 찜 목록 조회
			List<ReviewsDTO> reviewsDTOList = reviewsService.userReviews(userId);

			// 3. null, isEmpty인 경우: 찜 목록 조회 불가
			if (reviewsDTOList == null || reviewsDTOList.isEmpty()) {
				log.warn("리뷰목록이 비어있음");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰목록이 비어있음");
			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(reviewsDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : reviewListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : reviewListAll");
		}
	}

	// 2) Review 입력

	// 3) Review 수정
	@Transactional
	@PatchMapping("/review")
	public  ResponseEntity<?> reviewUpdate(@RequestHeader("Authorization") String header, @RequestBody ReviewsDTO reviewsDTO) {
		String userId = getUserIdFromHeader(header);

		try {
			reviewsService.updateReviews(userId, reviewsDTO.getReviewId(), reviewsDTO.getReviewContent(), reviewsDTO.isLikeDislike(), reviewsDTO.getReviewPhoto());

			List<ReviewsDTO> reviewsDTOList = reviewsService.userReviews(userId);
			if (reviewsDTOList == null || reviewsDTOList.isEmpty()) {
				log.warn("리뷰목록이 비어있음");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰목록이 비어있음");
			}

			return ResponseEntity.ok(reviewsDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : reviewUpdate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : reviewUpdate");
		}
	}

}
