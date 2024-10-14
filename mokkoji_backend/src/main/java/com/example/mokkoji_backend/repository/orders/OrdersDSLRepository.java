package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.RegDatePurchaseDTO;

import java.util.List;

public interface OrdersDSLRepository {
	List<GenderPurchaseDTO> findGenderPurchase(Long productId);

	List<FavoriteGenderDTO> findGenderFavorite(Long productId);

	List<OrdersDTO> findAllByUserId(String userId);

	List<RegDatePurchaseDTO> findRegDatePurchase(Long productId);
}
