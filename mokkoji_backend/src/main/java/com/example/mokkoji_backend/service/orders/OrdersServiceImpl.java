package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.repository.orders.OrdersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImpl implements OrdersService {

	OrdersRepository purchaseRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 구매내역 조회
	@Override
	public List<Orders> userOrders(String userId) {
		return purchaseRepository.findByUserIdOrderByRegDateDesc(userId);
	}

}
