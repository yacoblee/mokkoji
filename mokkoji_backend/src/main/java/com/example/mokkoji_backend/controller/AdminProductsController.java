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
import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
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
		List<Users> user = userService.findUserinfoToSearch(requestDTO.getKeyword(),requestDTO.getSearchType());
		int count = userService.countBy();
		log.info("$$ 서치 결과"+user);
	    Map<String, Object> response = new HashMap<>();
	    response.put("users", user);
	    response.put("count", count);
		
		return ResponseEntity.ok(response);
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
		
		if(saveDTO !=null) {
			 Map<String, Object> response =service.updateProductAndOptions(saveDTO, uploadfilef, request);
			 //Map<String, Object> response = service.getProductDetails(saveDTO.getProduct().getId());
			 
			 return ResponseEntity.ok(response);
		}else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("정보를 찾을 수 없습니다.");
		}
	}
	
//	@DeleteMapping("/administrator/deleteproduct")
//	public ResponseEntity<?> deleteProduct(@RequestParam Long productId){
//		log.info("productId =>"+productId);
//		service.deleteProduct(productId);
//		return null;
//	}
	
	//GET /api/administrator/{productId}/images
	@GetMapping("/administrator/pimage")
	public ResponseEntity<?> pageImage( Long id) {
		// - service를 통해 나오는 image List
		//response.put("mainImages", mainImages);
		//response.put("slideImages", slideImages);
		//response.put("selectProduct", entity);
		//response.put("code", code);
		Map<String, Object> response = service.getImageList(id);
		return ResponseEntity.ok(response);
	}
	@PostMapping("/administrator/imagesave")
	public ResponseEntity<?> saveImage(@RequestPart("images") String images  // JSON 데이터를 문자열로 받음
//			@RequestPart("images") List<ProductImages> images
			 ,@RequestPart(value = "files", required = false) MultipartFile[] files
			 ){
		   // JSON 데이터를 객체로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    List<ProductImages> imageList = null;
	    try {
	    	imageList = objectMapper.readValue(images, new TypeReference<List<ProductImages>>() {});
	    } catch (JsonProcessingException e) {
	        // 예외 처리
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON format");
	    }
		
	    for (ProductImages image : imageList) {
			log.info(image);
		}
        Long productId = (imageList.get(0).getProductId());

        // 1. 기존의 이미지 데이터를 삭제
        //productImageService.deleteImagesByProductId(productId);
        // **파일 처리 로직**
        if (files == null) {
            log.info("files 객체가 null 입니다. 파일이 전송되지 않았습니다.");
        } else if (files.length == 0) {
            log.info("files 배열이 비어 있습니다. 파일이 전송되지 않았습니다.");
        } else {
            log.info("전송된 파일 수: {}", files.length);
            for (int i = 0; i < files.length; i++) {
                MultipartFile file = files[i];
                if (file != null && !file.isEmpty()) {
                    log.info("파일 [{}]: 이름: {}, 크기: {} bytes", i, file.getOriginalFilename(), file.getSize());
                } else {
                    log.info("파일 [{}]는 비어 있습니다.", i);
                }
            }
        }
        // 2. 새로운 이미지 데이터를 처리
        for (int i = 0; i < imageList.size(); i++) {
        	
        	//MultipartFile file = (files != null && i < files.length ) ? files[i] : null;
        	MultipartFile file =null;
        	String imageName = imageList.get(i).getName();
        	int order = imageList.get(i).getOrder();
        	String type = imageList.get(i).getType();
        	if(files != null ) {
        		for (int j = 0; j < files.length; j++) {
                    if (files[j].getOriginalFilename().equals(imageName)) {
                        file = files[j];
                        break;  // 해당 파일을 찾으면 루프 종료
                    }
				}
        	}
        	 //MultipartFile file = (files != null && files.get(i) !=null) ? files.get(i) : null;
            //MultipartFile file = files.get(i);
        	// System.out.println(files.get(String.valueOf(i)));
            // 파일이 없으면 기존 파일 이름을 유지
            
            // **파일이 제대로 들어왔는지 로그 확인**
//            if (files == null) {
//                log.info("파일이 전송되지 않았습니다.");
//            } else {
//                log.info("파일이 전송되었습니다. 파일 수: ", files.length);
//            }
            if (file == null ||file.isEmpty()) {
//                imageName = imageData.get(i).get("name");
            	log.info("order : "+order+"type : "+type+"imageName : "+imageName);
            } else {
                // 파일이 존재하면 새로 저장
                //String storedFileName = saveFile(file);  // 파일 저장 로직
                //imageName = storedFileName;
            	log.info("파일이 존재합니다*************");
            	log.info("order : "+order+"type : "+type+"imageName : "+imageName);
            }

            // ProductImages 엔티티 생성
            ProductImages productImage = ProductImages.builder()
                    .productId(productId)
                    .order(order)
                    .type(type)
                    .name(imageName)
                    .build();
            log.info(productImage);
            //productImageService.saveOrUpdateImage(productImage); // 데이터베이스에 insert
        }

        return ResponseEntity.ok("Images saved successfully");
		
	}
}
