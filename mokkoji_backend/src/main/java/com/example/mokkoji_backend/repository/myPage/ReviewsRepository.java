package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.myPage.Reviews;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer> {

	List<Reviews> findByProductIdOrderByReviewDate(int productId);

	List<Reviews> findByUserIdOrderByReviewDateDesc(String userId);

}
