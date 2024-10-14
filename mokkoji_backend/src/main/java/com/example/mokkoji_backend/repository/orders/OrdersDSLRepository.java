package com.example.mokkoji_backend.repository.orders;

import java.util.List;

import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.RegDatePurchaseDTO;

public interface OrdersDSLRepository {
	List<GenderPurchaseDTO> findGenderPurchase(Long productId);
	List<FavoriteGenderDTO> findGenderFavorite(Long productId);
	List<RegDatePurchaseDTO> findRegDatePurchase(Long productId);
}
