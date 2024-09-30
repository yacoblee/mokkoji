package com.example.mokkoji_backend.service.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.entity.orders.OrdersId;
import com.example.mokkoji_backend.repository.orders.OrdersRepository;

@Service("OrdersService")
public class OrdersServiceImpl implements OrdersService {

	OrdersRepository ordersRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 구매내역 조회
	@Override
	public List<Orders> userOrders(String userId) {
		return ordersRepository.findByUserIdOrderByRegDateDesc(userId);
	}

	// ** 상품 페이지 사용 ==================================================
	public void insertOrders(Orders entity) {
		/*	 --OrdersId
		 * 	 int purchaseNumber;
			 String userId;
			 int addressId;*/
//		OrdersId id = OrdersId.builder()
//				.purchaseNumber(entity.getPurchaseNumber())
//				.userId(entity.getUserId())
//				.addressId(entity.getAddressId())
//				.build();
//		if(ordersRepository.findById(id).isPresent()) {
//			entity.setPurchaseStatus("상품 대기");
//					
//		}
		ordersRepository.save(entity);
	}
	
}
