package com.example.mokkoji_backend.service.goods;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import jakarta.servlet.http.HttpServletRequest;
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
	public void save(Products entity) {
		repository.save(entity);
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
		Page<Products> result = repository.findAll(requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	//// 2. 카테고리 링크
	@Override
	public PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByCategoryId(requestDTO.getCategoryId(), requestDTO.getPageable());
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
		Page<Products> result = repository.findByCategoryIdAndNameContaining(requestDTO.getCategoryId(),
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

//		if(requestDTO.getKeyword())
		if ("allGoods".equals(requestDTO.getCategoryId())) {
			log.info("allgoods 검색중 ?검색 키워드 :" + requestDTO.getKeyword());
			return findByNameContaining(requestDTO);
		} else {
			log.info("카테고리 검색중 ? 검색 키워드 :" + requestDTO.getKeyword() + ", 카테고리 : " + requestDTO.getCategoryId());
			return findByCategoryIdAndNameContaining(requestDTO);
		}
	}

	// 날짜 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByUploadDateBetween(PageRequestDTO requestDTO) {
		LocalDate startDate = requestDTO.getStartDate();
		LocalDate endDate = requestDTO.getEndDate();

		LocalDateTime startDateTime = startDate != null ? startDate.atStartOfDay() : null;
		LocalDateTime endDateTime = endDate != null ? endDate.atTime(23, 59, 59) : null;

		Page<Products> result = repository.findByUploadDateBetween(startDateTime, endDateTime,
				requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	// 제품 상태 검색
	@Override
	public PageResultDTO<ProductsDTO, Products> findByStatus(PageRequestDTO requestDTO) {

		int status = Integer.parseInt(requestDTO.getState());
		Page<Products> result = repository.findByStatus(status, requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	@Override
	public PageResultDTO<ProductsDTO, Products> findByNameContainingAndStatus(PageRequestDTO requestDTO) {
		Page<Products> result = repository.findByNameContainingAndStatus(requestDTO.getKeyword(), requestDTO.getState(),
				requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

	@Override
	public PageResultDTO<ProductsDTO, Products> findByNameContainingAndUploadDateBetween(PageRequestDTO requestDTO) {
		LocalDate startDate = requestDTO.getStartDate();
		LocalDate endDate = requestDTO.getEndDate();

		LocalDateTime startDateTime = startDate != null ? startDate.atStartOfDay() : null;
		LocalDateTime endDateTime = endDate != null ? endDate.atTime(23, 59, 59) : null;
		Page<Products> result = repository.findByNameContainingAndUploadDateBetween(requestDTO.getKeyword(),
				startDateTime, endDateTime, requestDTO.getPageable());
		return new PageResultDTO<>(result, e -> dslentityToDto(e));
	}

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

	// 관리자 페이지 서비스
	@Override
	public PageResultDTO<ProductsDTO, Products> adminSearch(PageRequestDTO requestDTO) {
		// 첫 요청 :
		// PageRequestDTO(page=1, size=10, categoryId=allGoods,
		// keyword=, typeSecond=null, ascending=true, ascendingSecond=true,
		// sub_type=null, startDate=null, endDate=null)
		log.info("관리자 페이지 검색 : " + requestDTO);
		return complexSearch(requestDTO);
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

		Products entity = findById(productId);

		if (entity == null) {
			log.error("[getProductDetails]해당하는 상품을 찾을 수 없습니다");
		}

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
				ProductsDTO dto = dslentityToDto(entity);
				response.put("product", dto);
			}
		} else {
			log.info("[/goods/{categoryId}/{productId}] 옵션정보 , 패키지 정보 발송 ");
			List<ProductOptions> options = opservice.findByProductId(productId);
			response.put("option", options);
			List<Packaging> packaging = paservice.findAll();
			response.put("packaging", packaging);
			// int stockCount = repository.getProductStockCount(productId);
			int stockCount = entity.getStockCount();
			if (entity != null && stockCount <= 5) {
				response.put("message", "품절 임박 , 재고가 " + stockCount + "개 남았습니다.");
			}
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
	(ProductSaveDTO saveDTO, MultipartFile uploadfilef, HttpServletRequest request) 
			 throws IOException{
	      Products product = saveDTO.getProduct();
	      List<ProductOptions> options = saveDTO.getOptions();
	    
	      // 이미지 처리 로직 분리
	        if (uploadfilef != null) {
	            product.setUploadfilef(uploadfilef);
	        }
	        
	        if(product.getUploadfilef()!=null&&!product.getUploadfilef().isEmpty()) {
				MultipartFile newuploadFile = product.getUploadfilef();
				 LocalDateTime now = LocalDateTime.now();
				 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss_");
				 String formattedDate = now.format(formatter);
				//물리적 저장위치 확인
				String realPath = request.getServletContext().getRealPath("/");
				realPath +="resources\\productImages\\";
				System.out.println(realPath);
				log.info("파일이 전달됨: - 이미지 수정이 있어야함 getOriginalFilename() : " + newuploadFile.getOriginalFilename());
//				File oldfile = new File(realPath+entity.getMainImageName());
//				if(oldfile.isFile()) {
//					oldfile.delete();
//				}
				String newFileName = formattedDate + newuploadFile.getOriginalFilename();
//				realPath += uploadfilef.getOriginalFilename();
				realPath += newFileName;
				newuploadFile.transferTo(new File(realPath));//throws IOException 추가해야 함
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
		List<ProductImages> imageList = imservice.findByProductId(id);
		if(imageList!=null) {
			for (ProductImages image : imageList) {
				ProductImagesId imageId = ProductImagesId
						.builder().productId(image.getProductId())
						.order(image.getOrder())
						.type(image.getType())
						.build();
				imservice.deleteById(imageId);
			}
		}
		deleteById(id);
	}
	
}
