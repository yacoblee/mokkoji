package com.example.mokkoji_backend.service.goods;

import java.util.List;


import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.pageTest.Criteria;

public interface ProductsService {

	List<Products> findAll();
	
	List<ProductsDTO> findList();
	
	PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO);
	
	List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id);
	
	List<Products> findAllProducts(Criteria cri);
	
	PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO);
	
	PageResultDTO<ProductsDTO, Products> pageList(PageRequestDTO requestDTO);
	
	ProductDetailDTO findDetailinfo(Long id);
	
	int countByCategoryId(String CategoryId);
	
	int countByAll();
	
	Products findById(Long id);
	
	ProductsDTO findDto(Long id);
	//ProductsDTO findByJoinOne(Long id);
	
	void save(Products item);
	
	void deleteById(Long id);
	

}
