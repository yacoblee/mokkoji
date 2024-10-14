package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;
import static com.example.mokkoji_backend.entity.orders.QOrders.orders;
import static com.example.mokkoji_backend.entity.orders.QOrdersDetail.ordersDetail;
import static com.example.mokkoji_backend.entity.login.QAddress.address;
import static com.example.mokkoji_backend.entity.goods.QProducts.products;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class OrdersDSLRepositoryImpl implements OrdersDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
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
				.fetch();  // 결과 반환
	}

}
