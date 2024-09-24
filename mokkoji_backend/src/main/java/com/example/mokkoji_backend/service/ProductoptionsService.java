package com.example.mokkoji_backend.service;

import java.util.List;

import com.example.mokkoji_backend.entity.ProductOptions;
import com.example.mokkoji_backend.entity.id.ProductOptionsId;


public interface ProductoptionsService {
	List<ProductOptions> findAll();
	
	List<ProductOptions> findByProductId(Long id);
	
	
	
	ProductOptions findById(ProductOptionsId id);
	
	
	void save(ProductOptions options);
	
	void deleteById(ProductOptionsId id);
	
}
