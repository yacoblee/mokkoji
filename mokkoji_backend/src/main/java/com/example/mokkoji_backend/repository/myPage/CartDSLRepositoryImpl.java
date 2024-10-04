package com.example.mokkoji_backend.repository.myPage;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import static com.example.mokkoji_backend.entity.myPage.QCart.cart;

import java.util.List;
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
	
	
	

}
