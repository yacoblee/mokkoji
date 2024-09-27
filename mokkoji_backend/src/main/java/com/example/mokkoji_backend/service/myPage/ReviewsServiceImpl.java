package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.myPage.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ReviewsService")
@RequiredArgsConstructor
public class ReviewsServiceImpl implements ReviewsService {

	final ReviewsRepository reviewsRepository;

	// ** 상품페이지에서만 사용 ===============================================
	//기훈ㅇ ㅏ 너무 고마워... 근데 형이 안맞아서 못가져온데... fk들은 엔터티 타입 확인 부탁해요 ....
	// 1) 각 상품별 review 목록 확인시 사용
	@Override
	public List<Reviews> productReviews(int productId) {
		return reviewsRepository.findByProductIdOrderByReviewDate(productId);
	}

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 review 목록 표시할 때 사용
	@Override
	public List<Reviews> userReviews(String userId) {
		return reviewsRepository.findByUserIdOrderByReviewDateDesc(userId);
	}

	// 2) review 작성할 때 사용
	@Override
	public void insertReviews(Reviews reviews) {
		reviewsRepository.save(reviews);
	}

	// 3) review 내용 수정할 때 사용
	@Override
	public void updateReviews(int reviewId, String reviewContent) {
		reviewsRepository.updateReview(reviewId, reviewContent);
	}

	// 4) review 삭제할 떄 사용
	@Override
	public void deleteReviews(int reviewId) {
		reviewsRepository.deleteById(reviewId);
	}

}
