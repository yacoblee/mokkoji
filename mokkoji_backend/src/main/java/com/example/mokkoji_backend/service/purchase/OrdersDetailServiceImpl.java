package com.example.mokkoji_backend.service.purchase;

import com.example.mokkoji_backend.entity.orders.OrdersDetail;
import com.example.mokkoji_backend.repository.purchase.OrdersDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersDetailServiceImpl implements OrdersDetailService {

	OrdersDetailRepository purchaseDetailRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 주문번호에 해당하는 구매내역 개별 조회
	@Override
	public List<OrdersDetail> ordersDetail(int purchaseNumber) {
		return purchaseDetailRepository.findByPurchaseNumberOrderByProductId(purchaseNumber);
	}

}
