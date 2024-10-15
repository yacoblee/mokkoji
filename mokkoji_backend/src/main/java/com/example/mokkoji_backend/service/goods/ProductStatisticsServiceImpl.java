package com.example.mokkoji_backend.service.goods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.productStatistics.FavoriteGenderDTO;
import com.example.mokkoji_backend.domain.productStatistics.GenderPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.RegDatePurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.SumOptionsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.orders.OrdersDSLRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductStatisticsServiceImpl implements ProductStatisticsService {
	private final ProductsService productService;
	private final OrdersDSLRepository orderDSLrepository;
	private final ProductsDSLRepository productDSLrepository;
	
	@Override
	public Map<String, Object> findGenderPurchase(Long productId){
		Map<String, Object> response = new HashMap<>();
		Products entity = productService.findById(productId);
		if (entity == null) {
			log.error("[getProductDetails]해당하는 상품을 찾을 수 없습니다");
		}
		List<GenderPurchaseDTO> genderPurchase= orderDSLrepository.findGenderPurchase(productId);
		List<FavoriteGenderDTO> genderFavorite = orderDSLrepository.findGenderFavorite(productId);
		List<RegDatePurchaseDTO> regDatePurchase = orderDSLrepository.findRegDatePurchase(productId);
		List<SumOptionsDTO> sumOption = productDSLrepository.sumOptions(productId);
		
		response.put("selectProduct", entity);
		response.put("genderPurchase", genderPurchase);
		response.put("genderFavorite", genderFavorite);
		response.put("regDatePurchase", regDatePurchase);
		response.put("sumOption", sumOption);
		//log.info(genderPurchase);

		return response;
	}
}
