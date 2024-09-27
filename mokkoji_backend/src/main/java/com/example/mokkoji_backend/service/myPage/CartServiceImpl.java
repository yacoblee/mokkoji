package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;
import com.example.mokkoji_backend.repository.myPage.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CartService")
public class CartServiceImpl implements CartService {

	CartRepository cartRepository;
	
	// ** 상품페이지에서만 사용 ===============================================
	
	// 1) cart에 새로 row를 추가할 때 사용
	@Override
	public void insertCart(Cart cart) {
		cartRepository.save(cart);
	}
	
	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 cart 목록 확인시 사용
	@Override
	public List<Cart> userCart(String userId) {
		return cartRepository.findByUserIdOrderByCartDateDesc(userId);
	}

	// 2) cart의 각 상품의 개수를 조정할 때 사용
	@Override
	public void updateCart(String userId, int productId, String optionContent, String packagingOptionContent, int productCnt, int productTotalCount) {
		cartRepository.updateCart(userId, productId, optionContent, packagingOptionContent, productCnt, productTotalCount);
	}

	// 3) cart의 상품을 삭제할 때 사용
	@Override
	public void deleteCart(CartId cartId) {
		cartRepository.deleteById(cartId);
	}

}