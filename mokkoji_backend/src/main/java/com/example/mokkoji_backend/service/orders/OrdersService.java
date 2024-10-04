package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.entity.orders.Orders;

import java.util.List;

public interface OrdersService {

	List<Orders> userOrders(String userId);

	Orders insertOrders(Orders entity);
}
