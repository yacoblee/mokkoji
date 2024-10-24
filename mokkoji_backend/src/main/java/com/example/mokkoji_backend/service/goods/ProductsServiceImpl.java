package com.example.mokkoji_backend.service.goods;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductSaveDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.service.CodeService;
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
	private final ProductImageService imservice;
	private final PackagingService paservice;
	private final ReviewsService reservice;
	private final CodeService codeService;
	
	
	// entity -> dto 변환 메서드 (DSR 이용)
	private ProductsDTO dslentityToDto(Products product) {
		return dsrepository.entityToDto(product);
	}


	// 전체 리스트 엔터티 반환
	@Override
	public List<Products> findAll() {
		return repository.findAll();
	}
	public List<Products> getAvailableProducts(){
		return repository.findByStatus(0);
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

	// - insert , update
	@Override
	public Products save(Products entity) {
		return repository.save(entity);
	}

	// 좋아요 수 없데이트 (+,- 통합)
	@Override
	public boolean updateLikeCount(Long productId, String sign) {
		try {
			boolean increase = sign.equals("+");
			int updatedRows = increase ? repository.increaseLikeCount(productId)
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

	// 재고 수 없데이트 (+,- 통합)
	@Override
	public boolean updateStockCont(Long productId, int productCnt, String sign) {
		try {
			boolean increase = sign.equals("+");
			int updatedRows = increase ? repository.increaseStockCount(productId, productCnt)
					: repository.decreaseStockCount(productId, productCnt);

			if (updatedRows > 0) {
				log.info("[updateStockCont] 재고 업데이트 성공: " + (increase ? "증가" : "감소") + ", 갯수 : " + productCnt);
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
		Page<Products> result = repository.findByStatus(0,requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	//// 2. 카테고리 링크
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByCategoryIdAndStatus(requestDTO.getCategoryId(),0, requestDTO.getPageable());
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
			requestDTO.setCategoryId(categoryId);
			return findByCategoryId(requestDTO);
		}
	}

	//// 카테고리 , 이름 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByCategoryIdAndStatusAndNameContaining(requestDTO.getCategoryId(),0,
				requestDTO.getKeyword(), requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	//// 이름 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByStatusAndNameContaining(0,requestDTO.getKeyword(), requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	// 상위검색 통합
	@Override
	public PageResultDTO<ProductsDTO, Products> searchGoods(PageRequestDTO requestDTO) {


		if ("allGoods".equals(requestDTO.getCategoryId())) {
			log.info("allgoods 검색중 ?검색 키워드 :" + requestDTO.getKeyword());
			return findByNameContaining(requestDTO);
		} else {
			log.info("카테고리 검색중 ? 검색 키워드 :" + requestDTO.getKeyword() + ", 카테고리 : " + requestDTO.getCategoryId());
			return findByCategoryIdAndNameContaining(requestDTO);
		}
	}



// 관리자 페이지 서비스
	@Override
	public PageResultDTO<ProductsDTO, Products> complexSearch(PageRequestDTO requestDTO) {
		LocalDate startDate = requestDTO.getStartDate();
		LocalDate endDate = requestDTO.getEndDate();

		LocalDateTime startDateTime = startDate != null ? startDate.atStartOfDay() : null;
		LocalDateTime endDateTime = endDate != null ? endDate.atTime(23, 59, 59) : null;

		Page<Products> result = repository.complexSearch(requestDTO.getKeyword(), requestDTO.getCategoryId(),
				startDateTime, endDateTime, requestDTO.getState(), requestDTO.getPageable());

		return new PageResultDTO<>(result, e -> dslentityToDto(e));
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
	@Transactional
	public Map<String, Object> getProductDetails(Long productId, String type) {
		Map<String, Object> response = new HashMap<>();

		Products entity = findById(productId);
		//List<ProductOptions> options = opservice.findByProductId(productId);
		//List<Packaging> packaging = paservice.findAll();

		List<ProductImages> slideImage = imservice.findByProductIdAndType(productId, "slide");
		List<ProductImages> mainImage = imservice.findByProductIdAndType(productId, "main");
		response.put("product", entity);
		response.put("slideImage", slideImage);
		response.put("mainImage", mainImage);
		response.put("recommend", findTop4ByOrderByCountDescNative(productId));
		response.put("review", reservice.productReviews(productId));
		response.put("option", opservice.findByProductId(productId));
		response.put("packaging", paservice.findAll());
		int stockCount = entity.getStockCount();
		if (entity != null && stockCount <= 5) {
			response.put("message", "품절 임박 , 재고가 " + stockCount + "개 남았습니다.");
		}
		return response;
	}
	@Override
	public Map<String, Object> getProductDetails(Long productId){
		Map<String, Object> response = new HashMap<>();
		Products entity = findById(productId);
		List<ProductOptions> options = opservice.findByProductId(productId);
		List<ProductImages> images = imservice.findByProductId(productId);
		//List<Code> codeList = codeService.selectPSList();
		if (entity == null) {
			log.error("[getProductDetails]해당하는 상품을 찾을 수 없습니다");
		}
		if (options == null) {
			log.error("[getProductDetails]해당하는 옵션을 찾을 수 없습니다");
		}
		response.put("selectProduct", entity);
		response.put("option", options);
		response.put("image", images);
		//response.put("code", codeList);
		return response;
	}
	

	@Override
	public Map<String, Object> getImageList(Long productId){
		Map<String, Object> response = new HashMap<>();
		Products entity = findById(productId);
		
		List<ProductImages> mainImages = imservice.findByProductIdAndType(productId,"main");
		List<ProductImages> slideImages = imservice.findByProductIdAndType(productId,"slide");
		//List<Code> codeList = codeService.selectPSList();
		if (entity == null) {
			log.error("[getProductDetails]해당하는 상품을 찾을 수 없습니다");
		}
		List<Code> code = codeService.selectPIList();
		response.put("mainImages", mainImages);
		response.put("slideImages", slideImages);
		response.put("selectProduct", entity);
		response.put("code", code);
		
		//response.put("code", codeList);
		return response;
	}
	@Override
	@Transactional
	public Map<String, Object> updateProductAndOptions
	(ProductSaveDTO saveDTO, MultipartFile uploadfilef) 
			 throws IOException{
	      Products product = saveDTO.getProduct();
	      List<ProductOptions> options = saveDTO.getOptions();
	    
	      // 이미지 처리 로직 분리
	        if (uploadfilef != null) {
	            product.setUploadfilef(uploadfilef);
	        }
	        
	        if(product.getUploadfilef()!=null&&!product.getUploadfilef().isEmpty()) {
				MultipartFile newuploadFile = product.getUploadfilef();
				String newFileName = imservice.uploadFile(newuploadFile);
				product.setMainImageName(newFileName);
			
			}else {
				 log.info("이미지 파일이 전달되지 않음.- 이미지 수정은 없는 상태");
			}
	        
			save(product);
			  
			if(options !=null) {			
				for (ProductOptions option : options) {
					String content = option.getContent();
		            if (content == null || content.isEmpty()|| content =="") {
		                continue;
		            }
					//option.setProductId(product.getId());  // productId를 명시적으로 설정
					opservice.save(option);					
				}
			}
			
			return getProductDetails(product.getId());
	}
	@Override
	@Transactional
	public void deleteProduct(Long id){
		List<ProductOptions> optionList =  opservice.findByProductId(id);
		if(optionList !=null) {
			for (ProductOptions option : optionList) {
				ProductOptionsId optionId = ProductOptionsId.builder()
						.productId(option.getProductId())
						.content(option.getContent())
						.build();
				opservice.deleteById(optionId);
			}
		}
		imservice.deleteImagesByProductId(id);
		deleteById(id);
	}
	@Override
	@Transactional
	public void insertAllProduct(ProductSaveDTO productSaveDTO,
			 MultipartFile[] mainImages,MultipartFile[] slideImages,
			 MultipartFile uploadfilef) throws IOException {
		Products product = productSaveDTO.getProduct();
		List<ProductOptions> options = productSaveDTO.getOptions();
		// 상품 정보 처리
		Products savedEntity;
		if (product!=null&&uploadfilef != null) {
			String newFileName = imservice.uploadFile(uploadfilef);
			product.setMainImageName(newFileName);
			System.out.println("uploadfilef 존재 : " + uploadfilef.getOriginalFilename());
			log.info(product);
		}
		savedEntity = save(product);
		Long productId = savedEntity.getId();
		

		// 옵션 처리
		for (ProductOptions option : options) {
			option.setProductId(productId);
			if(option.getContent().equals("")) {
				continue;
			}
			opservice.save(option);
			log.info(option);
		}

		//이미지 처리
		 if (mainImages != null) imservice.saveImageListWithProduct(mainImages, productId, "main");
		 if (slideImages != null) imservice.saveImageListWithProduct(slideImages, productId, "slide");
	
	}
	
	
	
}
