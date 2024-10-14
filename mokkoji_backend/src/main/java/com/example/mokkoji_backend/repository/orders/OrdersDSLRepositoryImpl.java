package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

import static com.example.mokkoji_backend.entity.goods.QProducts.products;
import static com.example.mokkoji_backend.entity.login.QAddress.address;
import static com.example.mokkoji_backend.entity.login.QUsers.users;
import static com.example.mokkoji_backend.entity.myPage.QFavorites.favorites;
import static com.example.mokkoji_backend.entity.orders.QOrders.orders;
import static com.example.mokkoji_backend.entity.orders.QOrdersDetail.ordersDetail;


@RequiredArgsConstructor
@Repository
public class OrdersDSLRepositoryImpl implements OrdersDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<GenderPurchaseDTO> findGenderPurchase(Long productId) {
	    // M과 F를 미리 정의한 리스트
	    List<String> genders = Arrays.asList("M", "F");

	    List<GenderPurchaseDTO> dtoList = jpaQueryFactory.select(
	            Projections.bean(GenderPurchaseDTO.class,
	                    users.gender,
	                    ordersDetail.purchaseNumber.count().as("purchaseCount")))
	         .from(ordersDetail)
	         .leftJoin(orders).on(ordersDetail.purchaseNumber.eq(orders.purchaseNumber))
	         .leftJoin(users).on(orders.userId.eq(users.userId))
	         .where(ordersDetail.productId.eq(productId)
	         .and(users.gender.in(genders)))  // M과 F만 가져오기
	         .groupBy(users.gender)
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
	
	
	// ** 마이페이지에서 사용 ============================================================
	
	// 1. 리스트 전체
	public List<OrdersDTO> findAllByUserId(String userId){
		return jpaQueryFactory
				.select(Projections.bean(OrdersDTO.class,
						orders.purchaseNumber,
						orders.userId,
						orders.addressId,
						address.locationName,
						orders.total,
						orders.regDate,
						ordersDetail.productId,
						products.name,
						ordersDetail.optionContent,
						ordersDetail.packagingOptionContent,
						ordersDetail.productCnt,
						ordersDetail.productTotalPrice
				))
				.from(orders)
				.leftJoin(ordersDetail).on(orders.purchaseNumber.eq(ordersDetail.purchaseNumber))  // Orders와 OrdersDetail을 JOIN
				.leftJoin(products).on(ordersDetail.productId.eq(products.id))  // OrdersDetail과 Product를 JOIN
				.leftJoin(address).on(orders.addressId.eq(address.addressId))  // Orders와 Address를 JOIN
				.where(orders.userId.eq(userId))  // 특정 userId로 필터링
				.orderBy(orders.regDate.desc()) // 최신순
				.orderBy(orders.purchaseNumber.asc()) // 주문번호순
				.orderBy(ordersDetail.productId.asc()) // 상품ID순
				.fetch();  // 결과 반환
	}

}
