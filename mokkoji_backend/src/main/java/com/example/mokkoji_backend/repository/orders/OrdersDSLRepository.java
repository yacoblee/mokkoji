package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;

import java.util.List;

public interface OrdersDSLRepository {
	List<OrdersDTO> findAllByUserId(String userId);
}
