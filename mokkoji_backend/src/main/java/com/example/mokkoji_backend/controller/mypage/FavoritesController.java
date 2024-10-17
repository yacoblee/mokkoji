package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	private TokenProvider tokenProvider;

	public String getUserIdFromHeader(String header) {
		return tokenProvider.validateAndGetUserId(header.substring(7));
	}

	// ** 기본 세팅 관련 ============================================================

	// 1) userId에 해당하는 favorites 최신순
	@GetMapping("/favorites")
//	public ResponseEntity<?> favoritesListAll(@AuthenticationPrincipal String userId) {
	public ResponseEntity<?> favoritesListAll(@RequestHeader("Authorization") String header, PageRequestDTO pageRequestDTO) {
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
			PageResultDTO<FavoritesDTO, Favorites> pageResultDTO = favoritesService.pageNationFavorites(userId, pageRequestDTO);

			List<FavoritesDTO> favoritesDTOList = pageResultDTO.getDtoList();

			Map<String, Object> response = new HashMap<>();
			response.put("favoritesDTOList", favoritesDTOList);
			response.put("pageMaker", pageResultDTO);

			// 4. 정상적인 경우
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : favoritesListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : favoritesListAll");
		}
	} //favoritesListAll

	// 2) 찜목록 삭제
	// 2.1) 단일 상품 삭제
	@DeleteMapping("/favorites/{productId}")
//	public ResponseEntity<?> favoritesDeleteOne(@AuthenticationPrincipal String userId, @PathVariable long productId) {
	public ResponseEntity<?> favoritesDeleteOne(@RequestHeader("Authorization") String header, @PathVariable long productId) {
		String userId = getUserIdFromHeader(header);
		log.info(userId);
		log.info(productId);

		FavoritesId favoritesId = new FavoritesId(userId, productId);

		// 1. 유효성 검사: favoritesId가 null일 때
		if (favoritesId == null) {
			log.warn("favoritesId 확인 불가");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("favoritesId 확인 불가");
		}

		try {
			// 2. 삭제할 항목이 존재하는지 확인 + 삭제
//			favoritesService.deleteFavorites(favoritesId);

			// 2. 삭제할 항목이 존재하는지 확인 + 삭제 + 상품의 찜 카운트 (-1)
			favoritesService.deleteSuccess(favoritesId);

			// 3. 삭제 성공 후 다시 List 출력
			List<FavoritesDTO> favoritesDTOList = favoritesService.userFavorites(userId);
			return ResponseEntity.ok(favoritesDTOList);

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
	@DeleteMapping("/favorites")
//	public ResponseEntity<?> favoritesDeleteCheck(@AuthenticationPrincipal String userId, @RequestBody List<Long> productIdList) {
	public ResponseEntity<?> favoritesDeleteCheck(@RequestHeader("Authorization") String header, @RequestBody List<Long> productIdList) {
		String userId = getUserIdFromHeader(header);

		// 1. 유효성 검사: productId 목록이 null이거나 비어있을때
		if (productIdList == null || productIdList.isEmpty()) {
			log.warn("productId 목록 확인 불가");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("productId 목록 확인 불가");
		}

		// 2. favoritesId에 대한 List 생성 : 반복문 사용
		List<FavoritesId> favoritesIdList = new ArrayList<>();

		for (Long productId : productIdList) {
			FavoritesId favoritesId = FavoritesId.builder()
					.userId(userId)
					.productId(productId)
					.build();
			favoritesIdList.add(favoritesId);
		}

		try {
			// 3. favoritesId에 대해 삭제 실행 : 반복문 사용
			for (FavoritesId favoritesId : favoritesIdList) {
				favoritesService.deleteFavorites(favoritesId);
			}

			// 4. 삭제 성공 후 다시 List 출력
			List<FavoritesDTO> favoritesDTOList = favoritesService.userFavorites(userId);
			return ResponseEntity.ok(favoritesDTOList);

		} catch (Exception e) {
			// 4. deleteFavorite에서 발생한 예외 처리 : favoritesId에 해당하는 항목 없음
			log.warn("favoritesId에 해당하는 항목 없음");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("favoritesId에 해당하는 항목 없음");
		}

	}

}
