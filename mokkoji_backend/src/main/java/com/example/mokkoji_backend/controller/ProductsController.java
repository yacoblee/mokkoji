package com.example.mokkoji_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
//@RequestMapping("/goods")
@RequiredArgsConstructor
public class ProductsController {

	private final ProductsService service;
	private final ProductoptionsService opservice;
	
	@GetMapping("/goods")
	public ResponseEntity<?> indexPage(){
		List<ProductsDTO> productList = service.findList();
		log.info("들어왔니 ?");
		if(productList != null && !productList.isEmpty()) {
			log.info("성공했니 ?");
			return ResponseEntity.ok(productList);
		}
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}
	
	
	
	
	@GetMapping("/goods/{sub_type_name}")
	public ResponseEntity<?> categotyList(@PathVariable("sub_type_name") String subTypeName) {
		List<ProductsDTO> productList = service.findByCategoryId(subTypeName);
		if(productList != null && !productList.isEmpty()) {// null 이 아닐 때
			return ResponseEntity.ok(productList);
		
		}else {
			productList = service.findList();
			log.info("성공했니 ?");
			return ResponseEntity.ok(productList);
			
		}
//		if(subTypeName=="allGoods") { // productList = null;
//		}
		
			//log.info("없어 ?");
			//return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
		
		
	}
}
