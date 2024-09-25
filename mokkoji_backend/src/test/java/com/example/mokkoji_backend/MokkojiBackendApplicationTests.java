package com.example.mokkoji_backend;

import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.myPage.ReviewsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MokkojiBackendApplicationTests {

	//@Test
	void contextLoads() {
	}
	ReviewsRepository reviewsRepository;

	@Test
	void test() {
	 	 List<Reviews> list = reviewsRepository.findByUserIdOrderByReviewDateDesc("user1");
		for (Reviews reviews : list) {
			System.out.println(reviews);
		}
	}

}
