package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.login.UsersDSLRepository;
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
	private final UsersDSLRepository userDSLRepository;
	
	
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
	
	@PostMapping("/administrator/users")
	public ResponseEntity<?> suchDB(@RequestBody PageRequestDTO requestDTO){
		System.out.println("들어왔니?");
		log.info("********" + requestDTO);
		List<Users> user = userDSLRepository.findUserinfoToSearch(requestDTO);
		if(user == null) {
			log.info("[suchDB] user is null");
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("허용된 검색 타입이 아닙니다.");
		}
		
		int count = userService.countBy();
		log.info("$$ 서치 결과"+user);
	    Map<String, Object> response = new HashMap<>();
	    response.put("users", user);
	    response.put("count", count);
		
		return ResponseEntity.ok(response);
	}
}
