package com.example.mokkoji_backend.repository.orders;

import static com.example.mokkoji_backend.entity.login.QUsers.users;
import static com.example.mokkoji_backend.entity.orders.QOrders.orders;
import static com.example.mokkoji_backend.entity.orders.QOrdersDetail.ordersDetail;
import static com.example.mokkoji_backend.entity.myPage.QFavorites.favorites;
import static com.example.mokkoji_backend.entity.goods.QProducts.products;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class OrdersDSLRepositoryImpl implements OrdersDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<GenderPurchaseDTO> findGenderPurchase(Long productId) {
	    // M과 F를 미리 정의한 리스트
	    List<String> genders = Arrays.asList("M", "F");
//	    
//	    List<GenderPurchaseDTO> dtoList = jpaQueryFactory.select(
//	            Projections.bean(GenderPurchaseDTO.class,
//	                    users.gender,
//	                    ordersDetail.purchaseNumber.count().as("purchaseCount")))
//	         .from(ordersDetail)
//	         .leftJoin(orders).on(ordersDetail.purchaseNumber.eq(orders.purchaseNumber))
//	         .leftJoin(users).on(orders.userId.eq(users.userId))
//	         .where(ordersDetail.productId.eq(productId)
//	         .and(users.gender.in(genders)))  // M과 F만 가져오기
//	         .groupBy(users.gender)
//	         .fetch();
		List<GenderPurchaseDTO> dtoList = jpaQueryFactory.select(
		        Projections.bean(GenderPurchaseDTO.class,
		                users.gender,
		                ordersDetail.productId,
		                ordersDetail.purchaseNumber.count().as("purchaseCount")))  // 각 상품별 구매 수를 집계
		    .from(ordersDetail)
		    .leftJoin(orders).on(ordersDetail.purchaseNumber.eq(orders.purchaseNumber))
		    .leftJoin(users).on(orders.userId.eq(users.userId))
		    .where(ordersDetail.productId.eq(productId)
		    .and(users.gender.in(genders)))  // M과 F만 가져오기
		    .groupBy(users.gender, ordersDetail.productId)  // 성별과 상품별로 그룹화
		    .fetch();
	    // M 성별이 없으면 추가
	    if (dtoList.stream().noneMatch(dto -> "M".equals(dto.getGender()))) {
	        dtoList.add(GenderPurchaseDTO.builder()
	                .gender("M").purchaseCount(0L).build());
	    }

	    // F 성별이 없으면 추가
	    if (dtoList.stream().noneMatch(dto -> "F".equals(dto.getGender()))) {
	        dtoList.add(GenderPurchaseDTO.builder()
	                .gender("F").purchaseCount(0L).build());
	    }

	    return dtoList;
	}

	@Override
	public List<FavoriteGenderDTO> findGenderFavorite(Long productId) {
	    // M과 F를 미리 정의한 리스트
	    List<String> genders = Arrays.asList("M", "F");
	    
	    List<FavoriteGenderDTO> dtoList = jpaQueryFactory.select(
	            Projections.bean(FavoriteGenderDTO.class,
	                    users.gender,
	                    favorites.count().as("favoriteCount")))
	         .from(products)
	         .leftJoin(favorites).on(favorites.productId.eq(products.id))
	         .leftJoin(users).on(favorites.userId.eq(users.userId))
	         .where(products.id.eq(productId)
	         .and(users.gender.in(genders)))  // M과 F만 가져오기
	         .groupBy(users.gender)
	         .fetch();

	    // M 성별이 없으면 추가
	    if (dtoList.stream().noneMatch(dto -> "M".equals(dto.getGender()))) {
	        dtoList.add(FavoriteGenderDTO.builder()
	                .gender("M").favoriteCount(0L).build());
	    }

	    // F 성별이 없으면 추가
	    if (dtoList.stream().noneMatch(dto -> "F".equals(dto.getGender()))) {
	        dtoList.add(FavoriteGenderDTO.builder()
	                .gender("F").favoriteCount(0L).build());
	    }

	    return dtoList;
	}
}
