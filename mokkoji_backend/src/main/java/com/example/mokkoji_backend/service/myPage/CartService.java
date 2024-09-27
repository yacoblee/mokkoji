package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;

import java.util.List;

public interface CartService {

	void insertCart(Cart cart);

	List<Cart> userCart(String userId);

	// 2) cart의 총 개수 조회
	int countCart(String userId);

	void updateCart(String userId, int productId, String optionContent, String packagingOptionContent, int productCnt, int productTotalCount);

	void deleteCart(CartId cartId);

}
