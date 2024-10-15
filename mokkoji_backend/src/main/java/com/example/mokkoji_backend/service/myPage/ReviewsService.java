package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.ReviewsDTO;
import com.example.mokkoji_backend.entity.myPage.Reviews;

import java.util.List;

public interface ReviewsService {

	List<Reviews> productReviews(long productId);

	List<ReviewsDTO> userReviews(String userId);

	void insertReviews(String userId, Long productId, String reviewContent, boolean likeDislike, String reviewPhoto);

	void updateReviews(String userId,int reviewId, String reviewContent, boolean likeDislike, String reviewPhoto);

	void deleteReviews(int reviewId);

}
