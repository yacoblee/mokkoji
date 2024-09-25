package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;

import ch.qos.logback.core.joran.conditional.ElseAction;
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
	public ResponseEntity<?> categotyList(@PathVariable("sub_type_name") String subTypeName) {
		List<ProductsDTO> productList = service.findByCategoryId(subTypeName);
		if(productList != null && !productList.isEmpty()) {// null 이 아닐 때
			log.info("/goods/{sub_type_name}_ 카테고리 있니 ? "+subTypeName);
			return ResponseEntity.ok(productList);
		
		}else {
			productList = service.findList();
			return ResponseEntity.ok(productList);
			
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
	    	log.info("Finding images with type: " + type);
	        List<ProductImages> image = imservice.findByProductIdAndType(productId, type);
	        log.info(image);
	        response.put("image", image);
	        
	        if(type.equals("main")) {
	        	response.put("detail", service.findDetailinfo(productId));
	        	response.put("recommend", service.findrecommendList(productId));
	        	//recommend, image, detail 
	        }else {
	        	//product, image
	        	ProductsDTO product = service.findDto(productId);
	        	response.put("product", product);
	        }
	    } 
	    else {
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
