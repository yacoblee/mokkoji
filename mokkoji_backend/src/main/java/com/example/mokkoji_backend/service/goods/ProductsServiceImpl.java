package com.example.mokkoji_backend.service.goods;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.service.myPage.ReviewsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductsServiceImpl implements ProductsService {

	private final ProductsRepository repository;
	private final ProductsDSLRepository dsrepository;
	
	private final ProductoptionsService opservice;
	private final ProductsImagesRepository imservice;
	private final PackagingService paservice;
	private final ReviewsService reservice;
	
	//entity -> dto 변환 메서드 (DSR 이용)
	private ProductsDTO dslentityToDto(Products product) {
		return dsrepository.entityToDto(product);
	}
	
	// 전체 리스트 엔터티 반환
	@Override
	public List<Products> findAll() {
		return repository.findAll();
	}
	
	//전체 리스트 dto 반환
	@Override
	public List<ProductsDTO> findList() {	
		return repository.findList();
	}
	
	//select ONE entity
	@Override
	public Products findById(Long id) {
		return repository.findById(id).get();
	}

	//select ONE Dto
	@Override
 public ProductsDTO findDto(Long id) {
		return repository.findDto(id);
	}
	
	// - insert , update
	@Override
	public void save(Products entity) {
		 repository.save(entity);
	}

	// - delete
	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);

	}
	 //// 전체 검색(allGoods)
	 @Override
	 public PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO){
		 Page<Products> result = repository.findAll(requestDTO.getPageable());
		 return new PageResultDTO<>(result , e->dslentityToDto(e));
	 }
	//// 카테고리 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO){
		Page<Products> result = repository.findByCategoryId(requestDTO.getType(),requestDTO.getPageable());
		List<Products> dtoList = result.getContent();
		return new PageResultDTO<>(result , e->dslentityToDto(e));
	}
	 
	////카테고리 , 이름 검색
	 @Override
	 public PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO) {
		 Page<Products> result = repository.findByCategoryIdAndNameContaining(requestDTO.getType(),requestDTO.getKeyword(),requestDTO.getPageable());
		 return new PageResultDTO<>(result , e->dslentityToDto(e));
	 }
	 
	 ////이름 검색
	 @Override
	public PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO) {	 
		 Page<Products> result = repository.findByNameContaining(requestDTO.getKeyword(), requestDTO.getPageable());
		return new PageResultDTO<>(result , e->dslentityToDto(e));
	}

	
	////추천 리스트 반환 (DSR 이용)
	@Override
	public List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id) {
		List<ProductsDTO> entities = dsrepository.recommendList(id);
		return entities;
	}

	
	//// dto로 형성된 table내의 text 찾아오기
	@Override
	public ProductDetailDTO findDetailinfo( Long id) {
		return repository.findDetailinfo(id);
	}

    // 각 type에 따른 정보를 가져오는 메서드(detail 페이지에서 사용)
	@Override
    public Map<String, Object> getProductDetails(Long productId, String type) {
        Map<String, Object> response = new HashMap<>();
        
        if (type != null && !type.equals("form")) {
            log.info("[/goods/{categoryId}/{productId}] 현재 타입 요청의 명은 ? : " + type);
            List<ProductImages> image = imservice.findByProductIdAndType(productId, type);
            response.put("image", image);

            if (type.equals("main")) {
                log.info("[/goods/{categoryId}/{productId}] 리뷰 , 디테일 , 추천 , 이미지 정보 발송 ");
                response.put("review", reservice.productReviews(productId));
                response.put("detail", findDetailinfo(productId));
                response.put("recommend", findTop4ByOrderByCountDescNative(productId));
            } else {
                log.info("[/goods/{categoryId}/{productId}] 상품 정보 , 이미지 정보 발송 ");
                ProductsDTO product = findDto(productId);
                response.put("product", product);
            }
        } else {
            log.info("[/goods/{categoryId}/{productId}] 옵션정보 , 패키지 정보 발송 ");
            List<ProductOptions> options = opservice.findByProductId(productId);
            response.put("option", options);
            List<Packaging> packaging = paservice.findAll();
            response.put("packaging", packaging);
        }

        return response;
    }



}
