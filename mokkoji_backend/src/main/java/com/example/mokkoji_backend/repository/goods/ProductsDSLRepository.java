package com.example.mokkoji_backend.repository.goods;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.domain.productStatistics.SumOptionsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

import java.util.List;

public interface ProductsDSLRepository {
	
	List<ProductsDTO> recommendList(Long id);
	
	ProductsDTO entityToDto(Products items);
	
	List<SumOptionsDTO> sumOptions(Long productId);
	
//	ProductsDTO findByJoinOne(Long id);
//	List<ProductsDTO> findByJoinList();
//	
}
