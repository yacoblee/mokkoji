package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.myPage.ReviewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsServiceImpl {

	ReviewsRepository reviewsRepository;

	List<Reviews> userReviews(String userId) {
		return reviewsRepository.findByUserIdOrderByReviewDateDesc(userId);
	}

}
