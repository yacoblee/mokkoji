package com.example.mokkoji_backend.service.goods;

import java.util.Map;

public interface ProductStatisticsService {
	Map<String, Object> findGenderPurchase(Long productId);
}
