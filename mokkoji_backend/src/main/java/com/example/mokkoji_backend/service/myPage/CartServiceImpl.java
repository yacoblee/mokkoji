package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.repository.myPage.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl {

	CartRepository cartRepository;

	// 마이페이지에서 cart 확인시 사용
	List<Cart> userCart(String userId) {
		return cartRepository.findByUserIdOrderByCartDateDesc(userId);
	}

}
