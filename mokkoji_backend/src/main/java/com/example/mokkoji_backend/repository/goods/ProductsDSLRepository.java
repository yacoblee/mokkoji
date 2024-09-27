package com.example.mokkoji_backend.repository.goods;

import java.util.List;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

public interface ProductsDSLRepository {
	
	List<ProductsDTO> findByJoinList();
	
	ProductsDTO findByJoinOne(Long id);
	
	List<ProductsDTO> recommendList(Long id);
	
	ProductsDTO entityToDto(Products items);
}
