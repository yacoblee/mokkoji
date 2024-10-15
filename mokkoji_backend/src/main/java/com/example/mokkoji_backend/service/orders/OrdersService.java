package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.domain.OrderRequestDTO;
import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalPurchaseDTO;
import com.example.mokkoji_backend.entity.orders.Orders;

import java.util.List;

public interface OrdersService {

	Orders insertOrders(Orders entity);
	
	void buyList(OrderRequestDTO request);

	List<OrdersDTO> listAllOrders(String userId);
	
}
