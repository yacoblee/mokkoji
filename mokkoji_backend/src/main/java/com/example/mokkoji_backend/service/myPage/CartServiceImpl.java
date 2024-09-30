package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.repository.myPage.CartRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("CartService")
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	final CartRepository cartRepository;
	final ProductsRepository productsRepository;
	
	// ** 상품페이지에서만 사용 ===============================================
	
	// 1) cart에 새로 row를 추가할 때 사용
	@Override
	public void insertCart(Cart cart) {
		
		cartRepository.save(cart);
	}
	
	@Override
	public void duplicateUpate(Cart cart) {
		CartId id = CartId.builder()
				.userId(cart.getUserId())
				.productId(cart.getProductId())
				.optionContent(cart.getOptionContent())
				.packagingOptionContent(cart.getPackagingOptionContent())
				.build();
		Optional<Cart> selectCart = cartRepository.findById(id);
		if(selectCart.isPresent()) {//수량 , 금액 증가하고 update.
			//String userId, long productId, String optionContent, String packagingOptionContent,
			//int productCnt, int productTotalPrice
			Cart existingCart = selectCart.get();
			cartRepository.
					updateCart(cart.getUserId(), cart.getProductId(), 
							cart.getOptionContent(), cart.getPackagingOptionContent(),
							cart.getProductCnt()+existingCart.getProductCnt(), cart.getProductTotalPrice()+existingCart.getProductTotalPrice());
		}else {//insert
			 cartRepository.save(cart);
		}
	}
	
	
	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 cart 목록 확인시 사용
	@Override
	public List<CartDTO> userCart(String userId) {
		List<Cart> cartList = cartRepository.findByUserIdOrderByCartDateDesc(userId);

		List<CartDTO> cartDTOList = cartList.stream().map(item -> {
			// Optional<Products>로 상품을 가져오기
			Optional<Products> products = productsRepository.findById(item.getProductId());
			CartDTO cartDTO = new CartDTO ();

			cartDTO.setUserId(item.getUserId());
			cartDTO.setProductId(item.getProductId());
			cartDTO.setOptionContent(item.getOptionContent());
			cartDTO.setPackagingOptionContent(item.getPackagingOptionContent());
			cartDTO.setProductCnt(item.getProductCnt());
			cartDTO.setProductTotalPrice(item.getProductTotalPrice());
			cartDTO.setCartDate(item.getCartDate());

			// Optional<Products>의 값이 존재하는 경우에만 설정
			if (products.isPresent()) {
				Products product = products.get();
				cartDTO.setProductName(product.getName());
				cartDTO.setCategoryId(product.getCategoryId());
				cartDTO.setMainImageName(product.getMainImageName());
			} else {
				// 기본값 설정 또는 로깅 등 처리
				cartDTO.setProductName(null);
				cartDTO.setCategoryId(null);
				cartDTO.setMainImageName(null);
			}

			return cartDTO;
		}).collect(Collectors.toList());

		return cartDTOList;
	}

	// 2) cart의 총 개수 조회
	@Override
	public int countCart(String userId){
		return cartRepository.countByUserId(userId);
	}

	// 3) cart의 각 상품의 개수를 조정할 때 사용
	@Override
	public void updateCart(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt, int productTotalCount) {
		cartRepository.updateCart(userId, productId, optionContent, packagingOptionContent, productCnt, productTotalCount);
	}

	// 4) cart의 상품을 삭제할 때 사용
	@Override
	public void deleteCart(CartId cartId) {
		cartRepository.deleteById(cartId);
	}

}
