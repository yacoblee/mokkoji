package com.example.mokkoji_backend.repository.orders;

import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.BestSellerPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.RegDatePurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalYearMonthPurchaseDTO;

import java.util.List;

public interface OrdersDSLRepository {
	List<GenderPurchaseDTO> findGenderPurchase(Long productId);

	List<FavoriteGenderDTO> findGenderFavorite(Long productId);

	List<OrdersDTO> findAllByUserId(String userId);

	List<RegDatePurchaseDTO> findRegDatePurchase(Long productId);
	
	List<TotalPurchaseDTO> findTotalMonthPurchase();
	
	List<TotalPurchaseDTO> findTotalYearPurchase();
	
	List<TotalYearMonthPurchaseDTO> findTotalYearMonthPurchase();
	
	List<BestSellerPurchaseDTO> findTopSellingProducts();
	
}
