package com.example.mokkoji_backend.service.orders;

import java.util.List;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.entity.orders.OrdersDetail;

public interface OrdersDetailService {

	List<OrdersDetail> ordersDetail(int purchaseNumber);
	
	void insertDtoList (List<CartDTO> list , int purchaseNumber);

}
