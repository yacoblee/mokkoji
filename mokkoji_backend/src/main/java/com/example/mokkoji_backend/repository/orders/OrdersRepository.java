package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.entity.orders.OrdersId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, OrdersId> {

	// userId로 구메내역 조회
	List<Orders> findByUserIdOrderByRegDateDesc(String userId);

}
