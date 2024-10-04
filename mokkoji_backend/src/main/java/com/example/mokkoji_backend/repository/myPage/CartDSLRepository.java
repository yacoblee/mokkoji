package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;

import java.util.List;

public interface CartDSLRepository {
	List<Cart> findByExcludingSpecificCart(String userId, long productId, String optionContent, String packagingOptionContent);
}
