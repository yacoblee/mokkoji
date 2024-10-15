package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.ReviewsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.repository.myPage.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("ReviewsService")
@RequiredArgsConstructor
public class ReviewsServiceImpl implements ReviewsService {

	final ReviewsRepository reviewsRepository;
	final ProductsRepository productsRepository;

	// ** 상품페이지에서만 사용 ===============================================
	//기훈ㅇ ㅏ 너무 고마워... 근데 형이 안맞아서 못가져온데... fk들은 엔터티 타입 확인 부탁해요 ....
	// 1) 각 상품별 review 목록 확인시 사용
	@Override
	public List<Reviews> productReviews(long productId) {
		return reviewsRepository.findByProductIdOrderByReviewDate(productId);
	}

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 review 목록 표시할 때 사용
	@Override
	public List<ReviewsDTO> userReviews(String userId) {
		List<Reviews> reviewsList = reviewsRepository.findByUserIdOrderByReviewDateDesc(userId);

		List<ReviewsDTO> reviewsDTOList = reviewsList.stream().map(item -> {

			Optional<Products> products = productsRepository.findById(item.getProductId());

			ReviewsDTO reviewsDTO = new ReviewsDTO();

			reviewsDTO.setReviewId(item.getReviewId());
			reviewsDTO.setUserId(item.getUserId());
			reviewsDTO.setProductId(item.getProductId());
			reviewsDTO.setReviewContent(item.getReviewContent());
			reviewsDTO.setReviewDate(item.getReviewDate());
			reviewsDTO.setReviewPhoto(item.getReviewPhoto());
			reviewsDTO.setLikeDislike(item.isLikeDislike());

			if (products.isPresent()) {
				Products product = products.get();
				reviewsDTO.setProductName(product.getName());
			} else {
				// 기본값 설정 또는 로깅 등 처리
				reviewsDTO.setProductName(null);
			}

			return reviewsDTO;
		}).collect(Collectors.toList());
		return reviewsDTOList;
	}

	// 2) review 작성할 때 사용
	@Override
	public void insertReviews(String userId, Long productId, String reviewContent, boolean likeDislike, String reviewPhoto) {
		Reviews reviews = Reviews.builder()
				.userId(userId)
				.productId(productId)
				.reviewContent(reviewContent)
				.likeDislike(likeDislike)
				.reviewPhoto(reviewPhoto)
				.build();

		reviewsRepository.save(reviews);
	}

	// 3) review 내용 수정할 때 사용
	@Override
	public void updateReviews(String userId,int reviewId, String reviewContent, boolean likeDislike, String reviewPhoto) {
		reviewsRepository.updateReview(userId, reviewId, reviewContent, likeDislike, reviewPhoto);
	}

	// 4) review 삭제할 떄 사용
	@Override
	public void deleteReviews(int reviewId) {
		reviewsRepository.deleteById(reviewId);
	}

}
