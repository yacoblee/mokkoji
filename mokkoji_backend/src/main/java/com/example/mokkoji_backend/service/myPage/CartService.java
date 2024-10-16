package com.example.mokkoji_backend.service.myPage;

import java.util.List;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;

public interface CartService {

	void insertCart(Cart cart);

	List<CartDTO> userCart(String userId);

	// 2) cart의 총 개수 조회
	int countCart(String userId);
	
	void duplicateUpate(Cart cart);
	
	Cart findById(CartId id);
	
	CartDTO entityToDto (Cart cart);
	
	CartDTO findentityAndNewReturnDto(Cart entity);
	 
	void removeIfExists(List<CartDTO> list);

	List<CartDTO> findentityAndNewReturnList(CartDTO dto);

	List<CartDTO> updateCart(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt);

	void deleteCart(CartId cartId);

}
