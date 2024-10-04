package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.entity.orders.OrdersId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

	// userId로 구메내역 조회
	List<Orders> findByUserIdOrderByRegDateDesc(String userId);

	
	// 유저 별 구매 횟수 조회 (구매번호 생성을위함)
	int countByUserId(String userId);
}
