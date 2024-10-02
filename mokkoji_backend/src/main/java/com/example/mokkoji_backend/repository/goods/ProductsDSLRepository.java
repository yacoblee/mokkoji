package com.example.mokkoji_backend.repository.goods;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

import java.util.List;

public interface ProductsDSLRepository {
	
	List<ProductsDTO> findByJoinList();
	
	ProductsDTO findByJoinOne(Long id);
	
	List<ProductsDTO> recommendList(Long id);
	
	ProductsDTO entityToDto(Products items);
}
