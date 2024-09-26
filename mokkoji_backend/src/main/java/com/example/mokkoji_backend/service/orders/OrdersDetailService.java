package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.entity.orders.OrdersDetail;

import java.util.List;

public interface OrdersDetailService {

	List<OrdersDetail> ordersDetail(int purchaseNumber);

}
