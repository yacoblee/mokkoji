package com.example.mokkoji_backend.service.goods;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductSaveDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

public interface ProductsService {

	// 전체 엔터티 반환
	List<Products> findAll();
	
	//전체 리스트 dto 반환
	List<ProductsDTO> findList();
	
	// 각 type에 따른 정보를 가져오는 메서드(detail 페이지에서 사용)
	Map<String, Object> getProductDetails(Long productId, String type);
	
	Map<String, Object> getProductDetails(Long productId);
	
	Map<String, Object> getImageList(Long productId);
	
	//추천 리스트 반환
	List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id);
	
	
	// 카테고리 검색
	PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO);
	// 전체 검색(allGoods)
	PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO);
	// 상우 링크 통합 서비스
	PageResultDTO<ProductsDTO, Products> linkGoods(String categoryId,PageRequestDTO requestDTO);
	
	
	//카테고리 , 이름 검색
	PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO);
	//이름 검색
	PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO);
	// 상위 검색 통합 서비스
	PageResultDTO<ProductsDTO, Products> searchGoods(PageRequestDTO requestDTO);
	//통합 겁색 complexSearch
	// 관리자 페이지 서비스
	PageResultDTO<ProductsDTO, Products> complexSearch(PageRequestDTO requestDTO);
	// dto로 형성된 table내의 text 찾아오기
	ProductDetailDTO findDetailinfo(Long id);
	//select ONE entity
	Products findById(Long id);
	

	// - insert , update
	Products save(Products item);
	
	// 좋아요 상태 업데이트
	boolean updateLikeCount(Long productId, String sign);
	
	// 재고 상태 업데이트
	boolean updateStockCont(Long productId,int productCnt, String sign);
	
	// - delete
	void deleteById(Long id);
	// - delete
	void deleteProduct(Long id);
	
	Map<String, Object> updateProductAndOptions
	(ProductSaveDTO saveDTO, MultipartFile uploadfilef) throws IOException;

	 void insertAllProduct(ProductSaveDTO productSaveDTO,
			 MultipartFile[] mainImages,MultipartFile[] slideImages,
			 MultipartFile uploadfilef) throws IOException ;
	 
	 
	 
	 
	 //날짜 검색
	 //PageResultDTO<ProductsDTO, Products> findByUploadDateBetween(PageRequestDTO requestDTO);
	 //제품 상태값 검색
	 //PageResultDTO<ProductsDTO, Products> findByStatus(PageRequestDTO requestDTO);
	 //이름 + 상태검색
	 //findByNameContainingAndStatus
	 //PageResultDTO<ProductsDTO, Products> findByNameContainingAndStatus(PageRequestDTO requestDTO);
	 //이름 + 날짜 findByNameContainingAndUploadDateBetween
	 //PageResultDTO<ProductsDTO, Products> findByNameContainingAndUploadDateBetween(PageRequestDTO requestDTO);
	 //PageResultDTO<ProductsDTO, Products> adminSearch(PageRequestDTO requestDTO);
	//ProductsDTO findByJoinOne(Long id);
	//List<Products> findAllProducts(Criteria cri);
	//int countByCategoryId(String CategoryId);
	//int countByAll();
}
