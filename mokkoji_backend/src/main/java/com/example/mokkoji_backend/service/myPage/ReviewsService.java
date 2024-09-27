package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Reviews;

import java.util.List;

public interface ReviewsService {

	List<Reviews> productReviews(long productId);

	List<Reviews> userReviews(String userId);

	void insertReviews(Reviews reviews);

	void updateReviews(int reviewId, String reviewContent);

	void deleteReviews(int reviewId);

}
