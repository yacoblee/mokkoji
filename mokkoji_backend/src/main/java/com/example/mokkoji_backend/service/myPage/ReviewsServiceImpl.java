package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.myPage.ReviewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsServiceImpl {

	ReviewsRepository reviewsRepository;

	// 마이페이지에서 review 확인시 기본으로 사용하는 method
	List<Reviews> userReviews(String userId) {
		return reviewsRepository.findByUserIdOrderByReviewDateDesc(userId);
	}

	// 상품페이지에서 review 확인시 기본으로 사용하는 method
	List<Reviews> productReviews(int productId) {
		return reviewsRepository.findByProductIdOrderByReviewDate(productId);
	}

}
