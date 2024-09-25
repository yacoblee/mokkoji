package com.example.mokkoji_backend.repository.goods;

import java.util.List;

import com.example.mokkoji_backend.domain.ProductsDTO;

public interface ProductsDSLRepository {
	
	List<ProductsDTO> findByJoinList();
	
	ProductsDTO findByJoinOne(Long id);
}
