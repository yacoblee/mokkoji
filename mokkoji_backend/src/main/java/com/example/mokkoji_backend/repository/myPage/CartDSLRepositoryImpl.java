package com.example.mokkoji_backend.repository.myPage;

import static com.example.mokkoji_backend.entity.myPage.QCart.cart;
import static com.example.mokkoji_backend.entity.goods.QProducts.products;
import static com.example.mokkoji_backend.entity.goods.QProductOptions.productOptions;
import static com.example.mokkoji_backend.entity.goods.QPackaging.packaging;

import java.util.List;

import com.example.mokkoji_backend.domain.CartDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
//import static com.example.mokkoji_backend.entity.goods.QProducts.products;

@Log4j2
@Repository
@RequiredArgsConstructor
public class CartDSLRepositoryImpl implements CartDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Cart> findByExcludingSpecificCart(String userId, long productId, String optionContent, String packagingOptionContent) {
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
	public List<CartDTO> findUserCartById(String userId) {
		return jpaQueryFactory
				.select(Projections.bean(CartDTO.class,
						cart.userId,
						cart.productId,
						cart.optionContent,
						cart.packagingOptionContent,
						cart.productCnt,
						cart.productTotalPrice,
						cart.cartDate,
						productOptions.price.as("optionPrice"),
						packaging.packagingPrice.as("packagingOptionPrice"),
						products.name.as("productName"),
						products.price.as("productPrice"),
						products.categoryId,
						products.mainImageName,
						products.stockCount))
				.from(cart)
				.leftJoin(productOptions)
				.on(cart.productId.eq(productOptions.productId)
						.and(cart.optionContent.eq(productOptions.content)))  // optionContent와 추가로 조인
				.leftJoin(packaging).on(cart.packagingOptionContent.eq(packaging.packagingContent))  // packagingOptionContent로 Packaging 조인
				.leftJoin(products).on(cart.productId.eq(products.id))  // productId로 Products 조인
				.where(cart.userId.eq(userId))  // userId 조건 추가
				.orderBy(cart.cartDate.desc())
				.fetch();
	}

	// 2. 수량 조정
	@Override
	@Transactional
	public void changeProductCnt(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt) {

		log.info("DSL : {}, {}, {}, {}, {}", userId, productId, optionContent, packagingOptionContent, productCnt);

		// 1) cart에 대해 productCnt 업데이트
		long affectedRows = jpaQueryFactory.update(cart)
				.set(cart.productCnt, productCnt)
				.where(cart.userId.eq(userId)
						.and(cart.productId.eq(productId))
						.and(cart.optionContent.eq(optionContent))
						.and(cart.packagingOptionContent.eq(packagingOptionContent)))
				.execute();

		log.info("1) cart에 대해 productCnt 업데이트 : 적용된 Row의 개수 {}", affectedRows);

		// 2) 각 entity에서 price, optionPrice, packagingOptionPrice 추출
		Integer price = jpaQueryFactory.select(products.price)
				.from(products)
				.where(products.id.eq(productId))
				.fetchOne();

		Integer optionPrice = jpaQueryFactory.select(productOptions.price)
				.from(productOptions)
				.where(productOptions.productId.eq(productId)
						.and(productOptions.content.eq(optionContent)))
				.fetchOne();

		Integer packagingOptionPrice = jpaQueryFactory.select(packaging.packagingPrice)
				.from(packaging)
				.where(packaging.packagingContent.eq(packagingOptionContent))
				.fetchOne();

		log.info("2) 추출한 가격들 : price {}, optionPrice {}, packagingOptionPrice {}", price, optionPrice, packagingOptionPrice);
		
		// 3) 새로운 가격 계산, 업데이트
		affectedRows = jpaQueryFactory.update(cart)
				.set(cart.productTotalPrice,
						Expressions.numberTemplate(Integer.class,
								"{0} * ({1} + {2} + {3})",
								productCnt, price, optionPrice, packagingOptionPrice))
				.where(cart.userId.eq(userId)
						.and(cart.productId.eq(productId))
						.and(cart.optionContent.eq(optionContent))
						.and(cart.packagingOptionContent.eq(packagingOptionContent)))
				.execute();

		log.info("3) cart에 대해 productTotalPrice 업데이트 : 적용된 Row의 개수 {}", affectedRows);
	}

}
