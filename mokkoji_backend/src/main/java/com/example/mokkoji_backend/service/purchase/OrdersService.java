package com.example.mokkoji_backend.service.purchase;

import com.example.mokkoji_backend.entity.orders.Orders;

import java.util.List;

public interface OrdersService {

	List<Orders> userOrders(String userId);

}
