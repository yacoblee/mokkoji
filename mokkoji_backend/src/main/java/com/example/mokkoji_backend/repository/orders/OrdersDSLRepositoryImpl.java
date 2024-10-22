package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.BestSellerPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.RegDatePurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalYearMonthPurchaseDTO;
import com.example.mokkoji_backend.entity.goods.QProducts;
import com.example.mokkoji_backend.entity.orders.QOrders;
import com.example.mokkoji_backend.entity.orders.QOrdersDetail;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
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
	
	
	// ** 마이페이지에서 사용 ============================================================
	
	// 1. 리스트 전체
	public List<OrdersDTO> findAllByUserId(String userId){
		return jpaQueryFactory
				.select(Projections.bean(OrdersDTO.class,
						orders.purchaseNumber,
						orders.userId,
						orders.streetAddress,
						address.streetAddress,
						orders.total,
						orders.regDate,
						products.id,
						products.name,
						ordersDetail.optionContent,
						ordersDetail.packagingOptionContent,
						ordersDetail.productCnt,
						ordersDetail.productTotalPrice,
						products.mainImageName
				))
				.from(orders)
				.leftJoin(ordersDetail).on(orders.purchaseNumber.eq(ordersDetail.purchaseNumber))  // Orders와 OrdersDetail을 JOIN
				.leftJoin(products).on(ordersDetail.productId.eq(products.id))  // OrdersDetail과 Product를 JOIN
				.leftJoin(address).on(orders.streetAddress.eq(address.streetAddress))  // Orders와 Address를 JOIN
				.where(orders.userId.eq(userId))  // 특정 userId로 필터링
				.orderBy(orders.regDate.desc()) // 최신순
				.fetch();  // 결과 반환
	}

//	SELECT o.reg_date , COUNT(od.purchase_number) AS purchase_count
//	FROM ordersdetail od
//	JOIN orders o ON od.purchase_number = o.purchase_number
//	JOIN users u ON o.user_id = u.user_id
//
//	WHERE od.product_id = 15
//	GROUP BY o.reg_date;
	@Override
	public List<RegDatePurchaseDTO> findRegDatePurchase(Long productId) {
	    
	    List<RegDatePurchaseDTO> dtoList = jpaQueryFactory.select(
	            Projections.bean(RegDatePurchaseDTO.class, 
	                orders.regDate.as("regDate"),
	                ordersDetail.purchaseNumber.count().as("purchaseCount"))) // 특정 컬럼 카운트
	        .from(ordersDetail)
	        .join(orders).on(ordersDetail.purchaseNumber.eq(orders.purchaseNumber)) // INNER JOIN
	        .where(ordersDetail.productId.eq(productId))
	        .groupBy(orders.regDate)
	        .fetch();
	        
	    return dtoList;
	}

	
	@Override
	public List<TotalPurchaseDTO> findTotalMonthPurchase() {
		QOrders orders = QOrders.orders; 
		
		
		return jpaQueryFactory
		         .select(Projections.constructor(TotalPurchaseDTO.class,
	                 Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate).as("yearmonth"),
	                 orders.total.sum().as("total_price")
	             ))
	             .from(orders)
	             .groupBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate))
	             .orderBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate).asc())
	             .fetch();
    }
	
	@Override
	public List<TotalPurchaseDTO> findTotalYearPurchase() {		
		
		return jpaQueryFactory
	         .select(Projections.constructor(TotalPurchaseDTO.class,
                 Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate).as("yearmonth"),
                 orders.total.sum().as("total_price")
             ))
             .from(orders)
             .groupBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate))
             .orderBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate).asc())
             .fetch();
    }
	
	@Override
	public List<TotalYearMonthPurchaseDTO> findTotalYearMonthPurchase() {

		
	    return jpaQueryFactory
	            .select(Projections.constructor(TotalYearMonthPurchaseDTO.class,
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate).as("year"),
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate).as("yearmonth"),
	                orders.total.sum().as("totalPrice")
	            ))
	            .from(orders)
	            .groupBy(
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate),
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate)
	            )
	            .orderBy(
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y')", orders.regDate).asc(),
	                Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", orders.regDate).asc()
	            )
	            .fetch();
	}
	
	@Override
	public List<BestSellerPurchaseDTO> findTopSellingProducts() {

        return jpaQueryFactory
        		.select(Projections.constructor(BestSellerPurchaseDTO.class,
                        products.id.as("productId"),
                        products.name.as("productName"),
                        products.price.as("productPrice"),
                        products.mainImageName.as("mainImageName"),
                        products.likeCount.as("likeCount"),
                        ordersDetail.productTotalPrice.sum().as("totalPrice")
                ))
                .from(ordersDetail)
                .join(products).on(ordersDetail.productId.eq(products.id))
                .groupBy(products.id, products.name, products.price, products.mainImageName, products.likeCount)
                .orderBy(ordersDetail.productTotalPrice.sum().desc())
                .limit(5)
                .fetch();
	}
	
	
	
	
}
