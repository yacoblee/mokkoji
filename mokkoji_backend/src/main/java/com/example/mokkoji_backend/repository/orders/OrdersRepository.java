package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.entity.orders.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

	// userId로 구메내역 조회
	List<Orders> findByUserIdOrderByRegDateDesc(String userId);

	
	// 유저 별 구매 횟수 조회 (구매번호 생성을위함)
	Long countByUserId(String userId);
	
	// 유저 별 총 구매 금액
	@Query("SELECT SUM(o.total) FROM Orders o WHERE o.userId = :userId")
	Long totalPurchaseAmount(String userId);
	
	@Query("SELECT SUM(o.total) FROM Orders o")
	Long totalAmount();
}
