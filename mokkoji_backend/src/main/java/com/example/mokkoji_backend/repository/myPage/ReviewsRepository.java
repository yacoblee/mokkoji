package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Integer> {

	// review를 productId로 조회, 날짜순으로 내림차순
	// => 삼품 페이지에서 활용
	List<Reviews> findByProductIdOrderByReviewDate(int productId);

	// review를 userId로 조회, 날짜순으로 내림차순
	// => 마이페이지에서 활용
	List<Reviews> findByUserIdOrderByReviewDateDesc(String userId);

}
