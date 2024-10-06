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

import jakarta.transaction.Transactional;
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

	// entity -> dto 변환 메서드 (DSR 이용)
	private ProductsDTO dslentityToDto(Products product) {
		return dsrepository.entityToDto(product);
	}

	// 전체 리스트 엔터티 반환
	@Override
	public List<Products> findAll() {
		return repository.findAll();
	}

	// 전체 리스트 dto 반환
	@Override
	public List<ProductsDTO> findList() {
		return repository.findList();
	}

	// select ONE entity
	@Override
	public Products findById(Long id) {
		return repository.findById(id).get();
	}

	// select ONE Dto
	@Override
	public ProductsDTO findDto(Long id) {
		return repository.findDto(id);
	}

	// - insert , update
	@Override
	public void save(Products entity) {
		repository.save(entity);
	}

	// 좋아요 수 없데이트 (+,- 통합)
	@Override
	public boolean updateLikeCount(Long productId, String sign) {
		try {
			 boolean increase = sign.equals("+");
			int updatedRows = increase
					? repository.increaseLikeCount(productId)
					: repository.decreaseLikeCount(productId);

			if (updatedRows > 0) {
				log.info("[updateLikeCount] 좋아요 업데이트 성공: " + (increase ? "증가" : "감소"));
				return true;
			} else {
				log.error("제품이 존재하지 않습니다: ID = " + productId);
				return false;
			}
		} catch (Exception e) {
			log.error("[updateLikeCount] 좋아요 카운트 업데이트 중 오류 발생: " + e.getMessage());
			return false;
		}

	}
	//재고 수 없데이트 (+,- 통합)
	@Override
	public boolean updateStockCont(Long productId,int productCnt, String sign) {
		try {
			 boolean increase = sign.equals("+");
			int updatedRows = increase
					? repository.increaseStockCount(productId,productCnt)
					: repository.decreaseStockCount(productId,productCnt);

			if (updatedRows > 0) {
				log.info("[updateStockCont] 재고 업데이트 성공: " + (increase ? "증가" : "감소")+", 갯수 : "+productCnt);
				return true;
			} else {
				log.error("제품이 존재하지 않습니다: ID = " + productId);
				return false;
			}
		} catch (Exception e) {
			log.error("[updateStockCont] 재고 업데이트 중 오류 발생: " + e.getMessage());
			return false;
		}
	}

	// - delete
	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);

	}

	//// 1. 전체 링크(allGoods)
	@Override
	public PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findAll(requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	//// 2. 카테고리 링크
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByCategoryId(requestDTO.getType(), requestDTO.getPageable());
		List<Products> dtoList = result.getContent();
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	// 3. 통합 링크 서비스
	@Override
	public PageResultDTO<ProductsDTO, Products> linkGoods(String categoryId, PageRequestDTO requestDTO) {
		if ("allGoods".equals(categoryId)) {
			log.info("전체 상품 링크 ?현재 링크 위치 :" + categoryId);
			return findPageAll(requestDTO);
		} else {
			log.info("카테고리 별 링크 ? 현재 링크 위치 :" + categoryId);
			return findByCategoryId(requestDTO);
		}
	}

	//// 카테고리 , 이름 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByCategoryIdAndNameContaining(requestDTO.getType(),
				requestDTO.getKeyword(), requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	//// 이름 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByNameContaining(requestDTO.getKeyword(), requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	// 상위검색 통합
	@Override
	public PageResultDTO<ProductsDTO, Products> searchGoods(PageRequestDTO requestDTO) {

		if ("allGoods".equals(requestDTO.getType())) {
			log.info("allgoods 검색중 ?검색 키워드 :" + requestDTO.getKeyword());
			return findByNameContaining(requestDTO);
		} else {
			log.info("카테고리 검색중 ? 검색 키워드 :" + requestDTO.getKeyword() + ", 카테고리 : " + requestDTO.getType());
			return findByCategoryIdAndNameContaining(requestDTO);
		}
	}

	//// 추천 리스트 반환 (DSR 이용)
	@Override
	public List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id) {
		List<ProductsDTO> entities = dsrepository.recommendList(id);
		return entities;
	}

	//// dto로 형성된 table내의 text 찾아오기
	@Override
	public ProductDetailDTO findDetailinfo(Long id) {
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
