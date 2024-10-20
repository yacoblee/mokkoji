package com.example.mokkoji_backend.service.orders;

import java.util.List;


import com.example.mokkoji_backend.domain.OrderRequestDTO;
import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.entity.orders.Orders;

public interface OrdersService {
   
	
	Orders insertOrders(Orders entity);
	
	void buyList(OrderRequestDTO request);

	List<OrdersDTO> listAllOrders(String userId);
	
	
	
}
