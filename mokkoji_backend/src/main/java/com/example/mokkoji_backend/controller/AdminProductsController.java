package com.example.mokkoji_backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductSaveDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.domain.UserAndAddressDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.domain.productStatistics.BestSellerPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalPurchaseDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalYearMonthPurchaseDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.repository.login.UsersDSLRepository;
import com.example.mokkoji_backend.repository.orders.OrdersDSLRepository;
import com.example.mokkoji_backend.service.CodeService;
import com.example.mokkoji_backend.service.goods.ProductImageService;
import com.example.mokkoji_backend.service.goods.ProductStatisticsService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class AdminProductsController {
	private final ProductsService service;
	private final UsersService userService;
	private final TokenProvider provider;
	private final FavoritesService favService;
	private final CartService cartService;
	private final CodeService codeService;
	private final ProductoptionsService optionService;
	private final ProductStatisticsService statisticsService ;

	private final ProductImageService imageService;
	private final UsersDSLRepository userDSLRepository;
	private final AddressRepository addressRepository;
	private final OrdersDSLRepository orderRepository;

	
	@GetMapping("/administrator/products")
	public ResponseEntity<?> indexPage(PageRequestDTO requestDTO) {
		// 데이터 포멧 넘침으로 인해 , dto로 변환된 list를 가져옴
		PageResultDTO<ProductsDTO, Products> resultDTO = service.complexSearch(requestDTO);
		List<ProductsDTO> productList = resultDTO.getDtoList();
		List<Code> codeList = codeService.selectPSList();
		if (productList != null && codeList != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("productList", productList);
			response.put("pageMaker", resultDTO);
			response.put("code", codeList);

			return ResponseEntity.ok(response);
		}
		log.info("/goods _ 실패했니 ?");
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}
	

	@GetMapping("/administrator/psave")
	public ResponseEntity<?> savePage(Long id) {
		Map<String, Object> response = service.getProductDetails(id);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/administrator/insertproduct")
	public ResponseEntity<?> savePage(@RequestPart ProductSaveDTO saveDTO,
			@RequestPart(value = "uploadfilef", required = false) MultipartFile uploadfilef, HttpServletRequest request)
			throws IOException {

		if (saveDTO != null) {
			Map<String, Object> response = service.updateProductAndOptions(saveDTO, uploadfilef);

			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("정보를 찾을 수 없습니다.");
		}
	}

	@DeleteMapping("/administrator/deleteproduct")
	public ResponseEntity<?> deleteProduct(@RequestParam Long productId){
		log.info("productId =>"+productId);
		service.deleteProduct(productId);
		return null;
	}

	// GET /api/administrator/{productId}/images
	@GetMapping("/administrator/pimage")
	public ResponseEntity<?> pageImage(Long id) {
		// - service를 통해 나오는 image List
		// response.put("mainImages", mainImages);
		// response.put("slideImages", slideImages);
		// response.put("selectProduct", entity);
		// response.put("code", code);
		Map<String, Object> response = service.getImageList(id);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/administrator/imagesave")
	public ResponseEntity<?> saveImage(@RequestPart("images") String images // JSON 데이터를 문자열로 받음
//			@RequestPart("images") List<ProductImages> images
			, @RequestPart(value = "files", required = false) MultipartFile[] files, HttpServletRequest request)
			throws IOException {
		// JSON 데이터를 객체로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		List<ProductImages> imageList = null;
		try {
			imageList = objectMapper.readValue(images, new TypeReference<List<ProductImages>>() {
			});

			imageService.saveImages(imageList, files);

			log.info("오류없이 작동완료");
			Long productId = imageList.get(0).getProductId();
			Map<String, Object> response = service.getImageList(productId);
			return ResponseEntity.ok(response);
		} catch (JsonProcessingException e) {
			// 예외 처리
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JsonProcessingException");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미지 파일화 실패");
		}

	}

	@PostMapping("/administrator/saveallproduct")
	public ResponseEntity<?> saveProduct(@RequestPart("productData") ProductSaveDTO productSaveDTO, // 상품 데이터와 옵션 데이터를
																									// 포함한 DTO
			@RequestPart(value = "mainImages", required = false) MultipartFile[] mainImages, // 메인 이미지 파일
			@RequestPart(value = "slideImages", required = false) MultipartFile[] slideImages,
			@RequestPart(value = "uploadfilef", required = false) MultipartFile uploadfilef// 슬라이드 이미지 파일
			, HttpServletRequest request)  {

		// DTO에서 상품 데이터 접근
		Products product = productSaveDTO.getProduct();
		List<ProductOptions> options = productSaveDTO.getOptions();
		// List<ProductImages> images = productSaveDTO.getImages();

		// 상품 정보 처리
		try {
			if (product != null) {
				service.insertAllProduct(productSaveDTO, mainImages, slideImages, uploadfilef);
			}
			return ResponseEntity.ok("Product saved successfully!");
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("sorry , i can't");
		}


	}
	
	@GetMapping("/administrator/statistics")
	public ResponseEntity<?> statistics(Long id) {
		Map<String, Object> response = statisticsService.findGenderPurchase(id);
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/administrator/orders")
	public ResponseEntity<?> getTotalMoney() {
		
		Map<String, Object> response = new HashMap<String, Object>();
		
		try {
			List<TotalPurchaseDTO> monthData = orderRepository.findTotalMonthPurchase();
			List<TotalPurchaseDTO> yearData = orderRepository.findTotalYearPurchase();
			List<TotalYearMonthPurchaseDTO> yearMonthData = orderRepository.findTotalYearMonthPurchase();
			List<BestSellerPurchaseDTO> best = orderRepository.findTopSellingProducts();
			
			response.put("year", yearData);
			response.put("month", monthData);
			response.put("yearmonth", yearMonthData);
			response.put("best", best);
			
			
			return ResponseEntity.ok(response);
			
		} catch (Exception e) {
			log.info("getTotalMoney Error : "+e.toString());
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	
	
	
	
	
}
