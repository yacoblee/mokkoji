package com.example.mokkoji_backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductSaveDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.login.UsersDSLRepository;
import com.example.mokkoji_backend.service.CodeService;
import com.example.mokkoji_backend.service.goods.ProductImageService;
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

	private final ProductImageService imageService;
	private final UsersDSLRepository userDSLRepository;

	@GetMapping("/administrator/products")
	public ResponseEntity<?> indexPage(PageRequestDTO requestDTO) {
		// 데이터 포멧 넘침으로 인해 , dto로 변환된 list를 가져옴
		PageResultDTO<ProductsDTO, Products> resultDTO = service.adminSearch(requestDTO);
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

	@PostMapping("/administrator/users")
	public ResponseEntity<?> suchDB(@RequestBody PageRequestDTO requestDTO) {
		System.out.println("들어왔니?");
		log.info("********" + requestDTO);
		PageResultDTO<UsersDTO, Users> result = userService.findUserinfoToSearch(requestDTO);
		List<UsersDTO> dto = result.getDtoList();
//		if(result == null) {
//			log.info("[suchDB] user is null");
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("허용된 검색 타입이 아닙니다.");
//		}
		int count = userService.countBy();
		log.info("$$ 서치 결과" + result);
		Map<String, Object> response = new HashMap<>();
		response.put("users", dto);
		response.put("pageMaker", result);
		response.put("count", count);
		return ResponseEntity.ok(response);
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
			Map<String, Object> response = service.updateProductAndOptions(saveDTO, uploadfilef, request);

			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("정보를 찾을 수 없습니다.");
		}
	}

//	@DeleteMapping("/administrator/deleteproduct")
//	public ResponseEntity<?> deleteProduct(@RequestParam Long productId){
//		log.info("productId =>"+productId);
//		service.deleteProduct(productId);
//		return null;
//	}

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
			, @RequestPart(value = "files", required = false) MultipartFile[] files
			, HttpServletRequest request)throws IOException {
		// JSON 데이터를 객체로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		List<ProductImages> imageList = null;
		try {
			imageList = objectMapper.readValue(images, new TypeReference<List<ProductImages>>() {
			});
			
			imageService.saveImages(imageList, files, request);
			
			log.info("오류없이 작동완료");
			Long productId = imageList.get(0).getProductId();
			Map<String, Object> response = service.getImageList(productId);
			return ResponseEntity.ok(response);
		} catch (JsonProcessingException e) {
			// 예외 처리
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JsonProcessingException");
		}catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미지 파일화 실패");
	    }

	}
}
