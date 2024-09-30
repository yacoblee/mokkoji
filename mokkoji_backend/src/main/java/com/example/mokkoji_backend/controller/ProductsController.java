package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Reviews;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;
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
	
//	@GetMapping("/goods/{sub_type_name}")
//	public ResponseEntity<?> categotyList(@PathVariable("sub_type_name") String subTypeName, PageRequestDTO dto) {
//        // 요청된 카테고리를 DTO에 설정
//        dto.setType(subTypeName);
//		//List<ProductsDTO> productList = null;
//		PageResultDTO<ProductsDTO, Products> resultDTO = service.pageList(dto);
//		List<ProductsDTO> productList = resultDTO.getDtoList();
//		// 전체 상품 수를 가져와서 페이지네이션을 위한 totalCount 설정
//	    //int totalCount = service.countByAll();
//		System.out.println("🙊paging & sort : crrentPageNumber:"+resultDTO.getCurrentPage());
//		System.out.println("startPage 1️⃣ : "+resultDTO.getStartPage());
//		System.out.println("totalPage : "+resultDTO.getTotalPage());
//		
//		
//	    // 응답에 상품 목록과 페이지네이션 정보를 포함시켜 반환
//	    Map<String, Object> response = new HashMap<>();
//	    
//	    // "allGoods"일 때 전체 상품을 가져오기
////	    if(dto ==null) {    	
////	    	if ("allGoods".equals(subTypeName)) {
////	    		productList = service.findList();
////	    	} else {
////	    		productList = service.findByCategoryId(subTypeName);
////	    	}
////	    }
//	  
//	    
//	    response.put("productList", productList);
//	    response.put("pageMaker", resultDTO);
//	    return ResponseEntity.ok(response);
//		
//	}
	
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
}
