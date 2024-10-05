package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.pageTest.Criteria;

import java.util.List;
import java.util.Map;

public interface ProductsService {

	// 전체 엔터티 반환
	List<Products> findAll();
	
	//전체 리스트 dto 반환
	List<ProductsDTO> findList();
	
	// 각 type에 따른 정보를 가져오는 메서드(detail 페이지에서 사용)
	Map<String, Object> getProductDetails(Long productId, String type);
	//추천 리스트 반환
	List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id);
	
	
	// 카테고리 검색
	PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO);
	// 전체 검색(allGoods)
	PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO);
	
	
	//카테고리 , 이름 검색
	PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO);
	//이름 검색
	PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO);
	
	// dto로 형성된 table내의 text 찾아오기
	ProductDetailDTO findDetailinfo(Long id);
	
	//select ONE entity
	Products findById(Long id);
	
	//select ONE Dto
	ProductsDTO findDto(Long id);
	
	// - insert , update
	void save(Products item);
	
	
	// - delete
	void deleteById(Long id);
	

	//ProductsDTO findByJoinOne(Long id);
	//List<Products> findAllProducts(Criteria cri);
	//int countByCategoryId(String CategoryId);
	//int countByAll();
}
