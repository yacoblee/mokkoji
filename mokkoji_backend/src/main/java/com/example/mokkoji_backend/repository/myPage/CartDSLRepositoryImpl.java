package com.example.mokkoji_backend.repository.myPage;

import static com.example.mokkoji_backend.entity.myPage.QCart.cart;
import static com.example.mokkoji_backend.entity.goods.QProducts.products;

import java.util.List;

import com.example.mokkoji_backend.domain.CartDTO;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
//import static com.example.mokkoji_backend.entity.goods.QProducts.products;
@Repository
@RequiredArgsConstructor
public class CartDSLRepositoryImpl implements CartDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Cart> findByExcludingSpecificCart(String userId, long productId, String optionContent,
			String packagingOptionContent) {
        return jpaQueryFactory
                .selectFrom(cart)
                .where(cart.userId.eq(userId)
                        .and(cart.productId.ne(productId)
                        .or(cart.optionContent.ne(optionContent))
                        .or(cart.packagingOptionContent.ne(packagingOptionContent))))
                .fetch();
	}

	// ** 마이페이지에서 사용 ========================================================================
	
	// 1. 리스트 뽑아오기
	@Override
	public List<CartDTO> userCart(String userId) {

	}


}
