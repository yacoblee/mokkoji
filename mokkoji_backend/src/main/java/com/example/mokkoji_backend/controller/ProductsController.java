package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import com.example.mokkoji_backend.service.myPage.ReviewsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
//@RequestMapping("/goods")
@RequiredArgsConstructor
public class ProductsController {

	private final ProductsService service;
//	private final ProductoptionsService opservice;
//	private final ProductsImagesRepository imservice;
//	private final PackagingService paservice;
//	private final ReviewsService reservice;
	private final TokenProvider provider;
	private final FavoritesService favService;
	private final CartService cartService;
//	private final PackagingService packSerivce;
//	private final AddressService addService;
//	private final OrdersService orderService;
//	private final OrdersDetailService orderDetailSerivce;

	// goods index page , 추천상품등 리스트 보여주기 위함.
	@GetMapping("/goods")
	public ResponseEntity<?> indexPage() {
		// 데이터 포멧 넘침으로 인해 , dto로 변환된 list를 가져옴
		List<ProductsDTO> productList = service.findList();

		if (productList != null && !productList.isEmpty()) {
			return ResponseEntity.ok(productList);
		}
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}

	// goods index 페이지에서 링크 이동을 통해 들어오면 데이터 걸러서 들어오게됨.
	// nav바를 통해 이동하더라도 이 메서드로 작동하게끔 분기 시킴.
	// 페이지 네이션이 기본적으로 이루어 져야함.
	@GetMapping("/goods/{sub_type_name}")
	public ResponseEntity<?> getCategoryList(@PathVariable("sub_type_name") String categoryId,
			PageRequestDTO requestDTO) {
		
	    if (categoryId == null || categoryId.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효하지 않은 카테고리입니다.");
	    }
	    
	    try {			
	    	PageResultDTO<ProductsDTO, Products> resultDTO = service.linkGoods(categoryId, requestDTO);
	    	// 1. PageResultDTO <DTO , Entity>를 통해 pageMaker의 역할과 dto변환을 맡음.
	    	// 2. 결과를 담을 listDTO가 필요 : productList
	    	// 3. pageMaker를 위해 dto 변환값을 저장하여 response 해준다.
	    	
	    	// ** nav의 allGoods 처리
	    	
	    	// 상황에 맞는 상품을 리스트로 변환
	    	List<ProductsDTO> productList = resultDTO.getDtoList();
	    	
	    	// 응답에 여러가지를 담기 위해 hashMap을 이용
	    	Map<String, Object> response = new HashMap<>();
	    	response.put("productList", productList);
	    	response.put("pageMaker", resultDTO);
	    	
	    	return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.error("상품 링크 중 오류 발생: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("상품 링크 중 오류 발생");
		}
	}// getCategoryList

	// 검색을 하면 들어오는 메서드.
	@GetMapping("/goods/search")
	public ResponseEntity<?> searchGoods(PageRequestDTO requestDTO) {
		// 1. PageResultDTO <DTO , Entity>를 통해 pageMaker의 역할과 dto변환을 맡음.
		
		log.info(requestDTO);
		try {
			
			PageResultDTO<ProductsDTO, Products> resultDTO = service.searchGoods(requestDTO);
			
			// ** select 타입의 allGoods 처리
			// 1. 모든 상품에 대해서는 name like %??%
			// 2. 카테고리 선정 상품에 대해서는 where name like %?% and categoryId = 블라블라
			
			// 상황에 맞는 상품을 리스트로 변환
			List<ProductsDTO> productList = resultDTO.getDtoList();
			
			Map<String, Object> response = new HashMap<>();
			response.put("productList", productList);
			response.put("pageMaker", resultDTO);
			
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("상품 검색 오류 발생");
			log.info(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("상품 검색 오류 발생");
		}
	}

	// 좋아요 상태 찾기
	@PostMapping("/goods/likedState")
	public ResponseEntity<?> likedState(@RequestHeader(value = "Authorization", required = false) String authHeader,
			@RequestBody ProductsDTO dto) {
		String id = null;
		try {
			if (authHeader != null) {
				String token = authHeader.substring(7);
				id = provider.validateAndGetUserId(token);
				log.info("[/goods/likedState] 의 토큰 의 주체 : id =>" + id);

			} else {
				System.out.println("로그인 상태가 아님.");
			}

			Map<String, Object> response = favService.getLikedState(dto, id);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("[/goods/likedState] 토큰 검증 실패" + e.getMessage());
		}
	}

	// 좋아요 상태 추가
	@PostMapping("/goods/liked")
	public ResponseEntity<?> insertliked(@RequestBody Favorites entity) {
		Map<String, Object> response = new HashMap<>();

		boolean insertSuccess = favService.insertSuccess(entity);

		response.put("liked", insertSuccess);

		if (insertSuccess) {
			log.info("[/goods/liked] 찜 상태 추가 완료");
			return ResponseEntity.ok(response);
		} else {
			log.info("[/goods/liked] 찜 상태 추가 실패");
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
		}
	}

	// 좋아요 상태 지우기
	@DeleteMapping("/goods/liked")
	public ResponseEntity<?> delteliked(@RequestBody FavoritesId entityid) {
		// System.out.println("*******************entityid : "+entityid);
		Map<String, Object> response = new HashMap<>();
		boolean deleteSuccess = favService.deleteSuccess(entityid);
		// false 가 성공을 의미.

		if (!deleteSuccess) {
			log.info("[/goods/liked] 찜 삭제 완료");
			return ResponseEntity.ok(response);
		} else {
			log.info("[/goods/liked] 찜 삭제 실패");
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
		}
	}

	@GetMapping("/goods/{categoryId}/{productId}")
	public ResponseEntity<?> detail(@PathVariable("categoryId") String categoryId,
			@PathVariable("productId") Long productId, @RequestParam(value = "type", required = false) String type) {

		Map<String, Object> response = service.getProductDetails(productId, type);
		return ResponseEntity.ok(response);
	}

	// -------------- 장바구니 추가 추후 cart 컨트롤러 추가

	@PostMapping("/cart/insertitem")
	public ResponseEntity<?> insertCart(@RequestBody Cart cart) {
		String message = "";
		if (cart != null) {
			cartService.duplicateUpate(cart);
			// System.out.println("************cart : "+cart);
			message = cart.toString();
			return ResponseEntity.ok(message);
		} else {
			log.info("[/cart/insertitem] 카트에 추가 실패. ");
			message = "카트 없음 실패";
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(message);
		}
	}

}
