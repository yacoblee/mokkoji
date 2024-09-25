package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {

	// cart를 userId로 조회, 날짜순으로 내림차순
	List<Cart> findByUserIdOrderByCartDateDesc(String userId);

}
