package com.example.mokkoji_backend.service;

import java.util.List;

import com.example.mokkoji_backend.entity.Productoptions;
import com.example.mokkoji_backend.entity.ProductoptionsId;


public interface ProductoptionsService {
	List<Productoptions> findAll();
	
	List<Productoptions> findByProductId(Long id);
	
	
	
	Productoptions findById(ProductoptionsId id);
	
	
	void save(Productoptions options);
	
	void deleteById(ProductoptionsId id);
	
}
