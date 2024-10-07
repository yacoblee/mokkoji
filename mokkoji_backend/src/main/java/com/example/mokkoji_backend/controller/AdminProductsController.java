package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.CodeService;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;

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
	
	@GetMapping("/administrator/products")
	public ResponseEntity<?> indexPage(PageRequestDTO requestDTO) {
		// 데이터 포멧 넘침으로 인해 , dto로 변환된 list를 가져옴
		PageResultDTO<ProductsDTO,Products> resultDTO = service.adminSearch(requestDTO);
		List<ProductsDTO> productList = resultDTO.getDtoList();
		List<Code> codeList = codeService.selectPSList();
		if (productList != null&& codeList!=null) {
			Map<String, Object> response = new HashMap<>();
	    	response.put("productList", productList);
	    	response.put("pageMaker", resultDTO);
	    	response.put("code", codeList);
			
	    
			
			return ResponseEntity.ok(response);
		}
		log.info("/goods _ 실패했니 ?");
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾을 수 없습니다.");
	}
}
