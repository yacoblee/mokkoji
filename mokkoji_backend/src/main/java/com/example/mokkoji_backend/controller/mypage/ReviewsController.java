package com.example.mokkoji_backend.controller.mypage;

import com.example.mokkoji_backend.domain.ReviewsDTO;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
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

	private final ServletContext servletContext;

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
//			if (reviewsDTOList == null || reviewsDTOList.isEmpty()) {
//				log.warn("리뷰목록이 비어있음");
//				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰목록이 비어있음");
//			}

			// 4. 정상적인 경우
			return ResponseEntity.ok(reviewsDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : reviewListAll");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : reviewListAll");
		}
	}

	// 2) Review 입력
	@Transactional
	@PostMapping("/reviews")
	public ResponseEntity<?> reviewInsert(@RequestHeader("Authorization") String header, ReviewsDTO reviewsDTO) throws IOException {
		String userId = getUserIdFromHeader(header);

		// 2) Upload File 처리 *********************************
		// 2.1) 물리적 실제 저장위치 확인 : file1
		String realPath = servletContext.getRealPath("/");
		realPath += "resources" + File.separator + "reviewImages" + File.separator;

		log.warn(realPath);

		// 2.2) realPath 존재확인 및 생성
		File file = new File(realPath);
		if ( !file.exists() ) file.mkdir();
		// => 저장폴더가 존재하지 않으면 생성해줌.

		// 2.3) basicman.png  Copy 하기 (IO Stream 실습)
		// => 기본Image (basicman.png) 가 uploadImages 폴더에 없는 경우
		//    images 폴더에서 복사하기
		// => IO 발생: Checked Exception
		file = new File(realPath+"basicImage.jpg");
		if ( !file.exists() ) {
			String basicImagePath = realPath + "basicImage.jpg";

			FileInputStream fin = new FileInputStream(new File(basicImagePath));
			// => basicImage를 읽어 파일입력 바이트스트림 생성
			FileOutputStream fout = new FileOutputStream(file);
			// => 목적지(realPath+"basicman.png") 파일출력 바이트스트림 생성
			FileCopyUtils.copy(fin, fout);
		}

		// 2.4) 저장경로 완성하기
		// => 물리적 저장위치 : file1
		// => table 저장값_파일명 : file2
		String file1="", file2="basicImage.jpg";

		MultipartFile uploadfilef = reviewsDTO.getReviewPhotoF();
		// => 업로드 파일 선택여부 확인
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			// => imageFile 선택 -> 저장
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로(realPath + 화일명) 완성
			uploadfilef.transferTo(new File(file1)); // file1 경로에 저장(붙여넣기)

			// => Table 저장값 완성
			file2 = uploadfilef.getOriginalFilename();
		}
		reviewsDTO.setReviewPhoto(file2);

		try {
			reviewsService.insertReviews(
					userId,
					reviewsDTO.getProductId(),
					reviewsDTO.getReviewContent(),
					reviewsDTO.isLikeDislike(),
					reviewsDTO.getReviewPhoto());
			List<ReviewsDTO> reviewsDTOList = reviewsService.userReviews(userId);

			return ResponseEntity.ok(reviewsDTOList);
		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : reviewInsert");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : reviewInsert");
		}
	}

	// 3) Review 수정
	@Transactional
	@PatchMapping("/review")
	public ResponseEntity<?> reviewUpdate(@RequestHeader("Authorization") String header, ReviewsDTO reviewsDTO) throws IOException {
		String userId = getUserIdFromHeader(header);

		log.warn(reviewsDTO.toString());

		// 2) Upload File 처리 *********************************
		// 2.1) 물리적 실제 저장위치 확인 : file1
		String realPath = servletContext.getRealPath("/");
		realPath += "resources" + File.separator + "reviewImages" + File.separator;

		// 2.2) realPath 존재확인 및 생성
		File file = new File(realPath);
		if ( !file.exists() ) file.mkdir();
		// => 저장폴더가 존재하지 않으면 생성해줌.

		// 2.3) basicman.png  Copy 하기 (IO Stream 실습)
		// => 기본Image (basicman.png) 가 uploadImages 폴더에 없는 경우
		//    images 폴더에서 복사하기
		// => IO 발생: Checked Exception
		file = new File(realPath+"basicImage.jpg");
		if ( !file.exists() ) {
			String basicImagePath = realPath + "basicImage.jpg";

			FileInputStream fin = new FileInputStream(new File(basicImagePath));
			// => basicImage 를 읽어 파일입력 바이트스트림 생성
			FileOutputStream fout = new FileOutputStream(file);
			// => 목적지(realPath+"basicman.png") 파일출력 바이트스트림 생성
			FileCopyUtils.copy(fin, fout);
		}

		// 2.4) 저장경로 완성하기
		// => 물리적 저장위치 : file1
		// => table 저장값_파일명 : file2
		String file1="", file2="basicImage.jpg";

		MultipartFile uploadfilef = reviewsDTO.getReviewPhotoF();
		// => 업로드 파일 선택여부 확인
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			// => imageFile 선택 -> 저장
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로(realPath + 화일명) 완성
			uploadfilef.transferTo(new File(file1)); // file1 경로에 저장(붙여넣기)

			// => Table 저장값 완성
			file2 = uploadfilef.getOriginalFilename();
		}
		reviewsDTO.setReviewPhoto(file2);

		try {
			reviewsService.updateReviews(userId, reviewsDTO.getReviewId(), reviewsDTO.getReviewContent(), reviewsDTO.isLikeDislike(), reviewsDTO.getReviewPhoto());

			List<ReviewsDTO> reviewsDTOList = reviewsService.userReviews(userId);
//			if (reviewsDTOList == null || reviewsDTOList.isEmpty()) {
//				log.warn("리뷰목록이 비어있음");
//				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰목록이 비어있음");
//			}

			return ResponseEntity.ok(reviewsDTOList);

		} catch (Exception e) {
			// 5. 서버에서 발생한 예외 처리
			log.warn("내부 서버 오류 : reviewUpdate");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : reviewUpdate");
		}
	}

}
