package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.entity.orders.OrdersDetail;
import com.example.mokkoji_backend.entity.orders.OrdersDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersDetailRepository extends JpaRepository<OrdersDetail, OrdersDetailId> {

	// purchaseNumber에 대해 상세정보 조회
	List<OrdersDetail> findByPurchaseNumberOrderByProductId(int purchaseNumber);

}
