package com.example.mokkoji_backend.service.goods;

import java.util.List;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

public interface ProductsService {

	List<Products> findAll();
	
	List<ProductsDTO> findList();
	
	List<ProductsDTO> findByCategoryId(String id);
	
	List<ProductsDTO> findrecommendList(Long id);
	
	ProductDetailDTO findDetailinfo(Long id);
	
	//List<ProductsDTO> findListDSL();
	
	Products findById(Long id);
	
	ProductsDTO findDto(Long id);
	//ProductsDTO findByJoinOne(Long id);
	
	void save(Products item);
	
	void deleteById(Long id);
}
