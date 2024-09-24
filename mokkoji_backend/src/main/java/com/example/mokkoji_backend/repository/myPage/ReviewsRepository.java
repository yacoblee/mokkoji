package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer> {

	List<Reviews> findByProductIdOrderByReviewDate(int productId);

	List<Reviews> findByUserIdOrderByReviewDateDesc(String userId);

}
