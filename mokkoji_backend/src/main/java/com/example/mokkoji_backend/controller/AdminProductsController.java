package com.example.mokkoji_backend.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductSaveDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.CodeService;
import com.example.mokkoji_backend.service.goods.ProductImageService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;

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
	@GetMapping("/administrator/psave")
	public ResponseEntity<?> savePage( Long id) {
		Map<String, Object> response = service.getProductDetails(id);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/administrator/insertproduct")
	public ResponseEntity<?> savePage (@RequestPart ProductSaveDTO saveDTO,
			@RequestPart(value = "uploadfilef", required = false) MultipartFile uploadfilef,
			HttpServletRequest request) throws IOException{
		Products product = saveDTO.getProduct();
		List<ProductOptions> options = saveDTO.getOptions();
		log.info(saveDTO);
		if(uploadfilef!=null) {
			product.setUploadfilef(uploadfilef);
		}
		//전달된 이미지 처리
		//1. 이미지 선택 여부를 확인
		if(product.getUploadfilef()!=null&&!product.getUploadfilef().isEmpty()) {
			MultipartFile newuploadFile = product.getUploadfilef();
			 LocalDateTime now = LocalDateTime.now();
			 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss_");
			 String formattedDate = now.format(formatter);
			//물리적 저장위치 확인
			String realPath = request.getServletContext().getRealPath("/");
			realPath +="resources\\productImages\\";
			System.out.println(realPath);
			log.info("파일이 전달됨: - 이미지 수정이 있어야함 getOriginalFilename() : " + newuploadFile.getOriginalFilename());
//			File oldfile = new File(realPath+entity.getMainImageName());
//			if(oldfile.isFile()) {
//				oldfile.delete();
//			}
			String newFileName = formattedDate + newuploadFile.getOriginalFilename();
//			realPath += uploadfilef.getOriginalFilename();
			realPath += newFileName;
			newuploadFile.transferTo(new File(realPath));//throws IOException 추가해야 함
			product.setMainImageName(newFileName);
		
		}else {
			 log.info("이미지 파일이 전달되지 않음.- 이미지 수정은 없는 상태");
		}
		
		
		for (ProductOptions option : options) {
			log.info(option);
		}
		
		service.save(product);
	  
		if(options !=null) {			
			for (ProductOptions option : options) {
				String content = option.getContent();
				if(content=="") continue;
				option.setProductId(product.getId());  // productId를 명시적으로 설정
				//option.setProduct(product);  // product를 명시적으로 설정
				optionService.save(option);					
			}
		}
		
		return null;
	}
	
}
