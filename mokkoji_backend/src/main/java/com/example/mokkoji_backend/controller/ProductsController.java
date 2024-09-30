package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.UsersRepository;
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
	private final ProductoptionsService opservice;
	private final ProductsImagesRepository imservice;
	private final PackagingService paservice;
	private final ReviewsService reservice;
	private final UsersService userService;
	private final TokenProvider provider;
	private final FavoritesService favService;
	private final CartService cartService;
	
	//goods index page , 추천상품등 리스트 보여주기 위함.
	@GetMapping("/goods")
	public ResponseEntity<?> indexPage(){
		//데이터 포멧 넘침으로 인해 , dto로 변환된 list를 가져옴
		List<ProductsDTO> productList = service.findList();
		
		if(productList != null && !productList.isEmpty()) {
			log.info("/goods _ 성공했니 ?");
			return ResponseEntity.ok(productList);
		}
		log.info("/goods _ 실패했니 ?");
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}//indexPage
	
	//goods index 페이지에서 링크 이동을 통해 들어오면 데이터 걸러서 들어오게됨.
	//nav바를 통해 이동하더라도 이 메서드로 작동하게끔 분기 시킴.
	//페이지 네이션이 기본적으로 이루어 져야함.
	@GetMapping("/goods/{sub_type_name}")
	public ResponseEntity<?> getCategoryList(@PathVariable("sub_type_name") String categoryId,
			PageRequestDTO requestDTO) {
	    PageResultDTO<ProductsDTO, Products> resultDTO ;
	    //1. PageResultDTO <DTO , Entity>를 통해 pageMaker의 역할과 dto변환을 맡음.
	    //2. 결과를 담을 listDTO가 필요 : productList
	    //3. pageMaker를 위해 dto 변환값을 저장하여 response 해준다.
	    
	    
	    //** nav의 allGoods 처리
	    if ("allGoods".equals(categoryId)) {
	    		
	    	 resultDTO =service.findPageAll(requestDTO);
	        log.info("전체 상품 링크 ?현재 링크 위치 :"+categoryId);
	    } else {
	    	// v1 : 페이징 처리 없음 
	    	//productList = service.findByCategoryId(requestDTO).getDtoList(); // 특정 카테고리 상품을 가져옴
	    	
	    	resultDTO =service.findByCategoryId(requestDTO); 
	        log.info("카테고리 별 링크 ? 현재 링크 위치 :"+categoryId);
	    }
	    // 상황에 맞는 상품을 리스트로 변환
	    List<ProductsDTO> productList = resultDTO.getDtoList();

	    // 응답에 여러가지를 담기 위해 hashMap을 이용
	    Map<String, Object> response = new HashMap<>();
	    response.put("productList", productList);
	    response.put("pageMaker", resultDTO);
	    
	    return ResponseEntity.ok(response);
	}//getCategoryList
	
	
	//검색을 하면 들어오는 메서드.
	@GetMapping("/goods/search")
	public ResponseEntity<?> searchGoods( PageRequestDTO requestDTO) {
	    // 1. PageResultDTO <DTO , Entity>를 통해 pageMaker의 역할과 dto변환을 맡음.
	    PageResultDTO<ProductsDTO, Products> resultDTO ;
    	
	  //** select 타입의 allGoods 처리
	    //1. 모든 상품에 대해서는  name like %??%
	    //2. 카테고리 선정 상품에 대해서는 where name like %?% and categoryId = 블라블라
	    if(requestDTO.getType().equals("allGoods")) {
	    	resultDTO = service.findByNameContaining(requestDTO);
	    	
	    	log.info("allgoods 검색중 ?검색 키워드 :"+requestDTO.getKeyword());
	    }else {
	    	resultDTO = service.findByCategoryIdAndNameContaining(requestDTO);
	    	
	    	log.info("카테고리 검색중 ? 검색 키워드 :"+requestDTO.getKeyword()+", 카테고리 : "+requestDTO.getType() );
	    }
	 // 상황에 맞는 상품을 리스트로 변환
	    List<ProductsDTO> productList = resultDTO.getDtoList();
	    
	   
	    Map<String, Object> response = new HashMap<>();
	    response.put("productList", productList);
	    response.put("pageMaker", resultDTO);

	    return ResponseEntity.ok(response);
	}
	
	//좋아요 상태 찾기
	@PostMapping("/goods/likedState")
	public ResponseEntity<?> likedState(@RequestHeader(value = "Authorization", required = false) String authHeader,@RequestBody ProductsDTO dto){
		String id = null; 
		if(authHeader != null) {
			String token = authHeader.substring(7);
			id = provider.validateAndGetUserId(token);
			System.out.println("/goods/user 의 provider.validateAndGetUserId =>"+id);
			Users user = userService.selectOne(id);
			
		}else {
			System.out.println("로그인 상태가 아님.");
		}
		System.out.println("*************************************"+dto);
		FavoritesId fid = FavoritesId.builder().userId(id).productId(dto.getId()).build();
		Map<String, Object> response = new HashMap<>();
		
		try {
			Favorites liked = favService.productFavorite(fid);
			response.put("liked", true);
		} catch (Exception e) {
			System.out.println("찾기 실패");
			response.put("liked", false);
		}
		response.put("userId",id);
		return ResponseEntity.ok(response);
	}
	
	//좋아요 상태 추가
	@PostMapping("/goods/liked")
	public ResponseEntity<?> insertliked(@RequestBody Favorites entity){
		Map<String, Object> response = new HashMap<>();
		try {
			favService.insertFavorite(entity);
			response.put("liked", true);
			return ResponseEntity.ok(response);
		}catch (Exception e) {
			response.put("liked", false);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
		}
	}
	
	//좋아요 상태 지우기
	@DeleteMapping("/goods/liked")
	public ResponseEntity<?> delteliked(@RequestBody FavoritesId entityid){
		System.out.println("*******************entityid : "+entityid);
		Map<String, Object> response = new HashMap<>();
		try {
			favService.deleteFavorite(entityid);
			response.put("liked", false);
			return ResponseEntity.ok(response);
		}catch (Exception e) {
			response.put("liked", true);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
		}
	}
	
	@GetMapping("/goods/{categoryId}/{productId}")
	public ResponseEntity<?> detail(@PathVariable("categoryId") String categoryId,
            @PathVariable("productId") Long productId,
            @RequestParam(value = "type", required = false) String type) {

	    Map<String, Object> response = new HashMap<>();
	    System.out.println("실행되고 있니 ?");
	    // 요청된 데이터에 따라 필요한 정보만 반환
	    if (type != null &&  !type.equals("form")) {
	    	//recommend, image, detail  , review
	    	log.info("Finding images with type: " + type);
	        List<ProductImages> image = imservice.findByProductIdAndType(productId, type);
	        log.info(image);
	        response.put("image", image);
	        if(type.equals("main")) {
	        	
	        	response.put("review",reservice.productReviews(productId));
	        	response.put("detail", service.findDetailinfo(productId));	
	        	response.put("recommend", service.findTop4ByOrderByCountDescNative(productId));
	        }else {
	        	//product, image
	        	ProductsDTO product = service.findDto(productId);
	        	response.put("product", product);
	        }
	    } 
	    else {
	    	
	    	//option , packaging
	    	log.info("Finding all packaging");
	    	List<ProductOptions> options= opservice.findByProductId(productId);
	    	response.put("option",options );
	    	log.info("options"+options);
	        List<Packaging> packaging = paservice.findAll();
	        response.put("packaging", packaging);
	    }

	    return ResponseEntity.ok(response);
	}
	
	// -------------- 장바구니 추가 추후 cart 컨트롤러 추가
	
	@PostMapping("/cart/insertitem")
	public ResponseEntity<?> insertCart(@RequestBody Cart cart){
		String message = "";
		if(cart!=null) {
			cartService.duplicateUpate(cart);
			System.out.println("************cart : "+cart);
			message = cart.toString();
		}else {
			System.out.println("카트 없음 실패");
			message = "카트 없음 실패";
		}
		return ResponseEntity.ok(message);
	}
	
	
}
