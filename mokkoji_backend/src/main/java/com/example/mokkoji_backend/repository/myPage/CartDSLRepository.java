package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.entity.myPage.Cart;

public interface CartDSLRepository {

	List<Cart> findByExcludingSpecificCart(String userId, long productId, String optionContent, String packagingOptionContent);

	List<CartDTO> findUserCartById(String userId);

	void changeProductCnt(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt);

}
