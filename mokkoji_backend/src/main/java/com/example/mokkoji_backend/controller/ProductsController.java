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

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.pageTest.Criteria;
import com.example.mokkoji_backend.pageTest.PageMaker;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;

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
	
	@GetMapping("/goods")
	public ResponseEntity<?> indexPage(){
		List<ProductsDTO> productList = service.findList();
		log.info("/goods _ 들어왔니 ?");
		if(productList != null && !productList.isEmpty()) {
			log.info("/goods _ 성공했니 ?");
			return ResponseEntity.ok(productList);
		}
		log.info("/goods _ 실패했니 ?");
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}
	
	
	
	
	@GetMapping("/goods/{sub_type_name}")
	public ResponseEntity<?> categotyList(@PathVariable("sub_type_name") String subTypeName, Criteria cri) {
		List<ProductsDTO> productList = service.findByCategoryId(subTypeName);
		
	    // 전체 상품 수를 가져와서 페이지네이션을 위한 totalCount 설정
	    int totalCount = service.countByAll();


	    // 응답에 상품 목록과 페이지네이션 정보를 포함시켜 반환
	    Map<String, Object> response = new HashMap<>();
	    
	    // "allGoods"일 때 전체 상품을 가져오기
	    if ("allGoods".equals(subTypeName)) {
	        productList = service.findList();
	    } else {
	        productList = service.findByCategoryId(subTypeName);
	    }
	    PageMaker pageMaker = new PageMaker();
	    pageMaker.setCri(cri);
	    pageMaker.setTotalRowCount(totalCount);
	    
	    response.put("productList", productList);
	    response.put("pageMaker", pageMaker);
	    return ResponseEntity.ok(response);
		
	}
	
	@GetMapping("/goods/{categoryId}/{productId}")
	public ResponseEntity<?> detail(@PathVariable("categoryId") String categoryId,
            @PathVariable("productId") Long productId,
            @RequestParam(value = "type", required = false) String type) {

	    Map<String, Object> response = new HashMap<>();
	    System.out.println("실행되고 있니 ?");
	    // 요청된 데이터에 따라 필요한 정보만 반환
	    if (type != null &&  !type.equals("form")) {
	    	//recommend, image, detail 
	    	log.info("Finding images with type: " + type);
	        List<ProductImages> image = imservice.findByProductIdAndType(productId, type);
	        log.info(image);
	        response.put("image", image);
	        
	        if(type.equals("main")) {
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
