package com.example.mokkoji_backend.controller.admin;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.PaymentRequestDto;
import com.example.mokkoji_backend.domain.RegistDTO;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
import com.example.mokkoji_backend.service.PaymentService;
import com.example.mokkoji_backend.service.registration.RegistImageService;
import com.example.mokkoji_backend.service.registration.RegistService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//import org.junit.jupiter.params.shadow.com.univocity.parsers.annotations.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class AdminRegistController {
	
	private final RegistService service;
	private final RegistImageService imageservice;
	private final TokenProvider provider;
	private final RegistRepository registRepository;
 

 
	
	
    @GetMapping("/administrator/reserve")
    public ResponseEntity<Map<String,Object>> getRegistsAndCounts(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String id = null; 
      
    	Map<String, Object> registsAndCounts = service.getRegistsAndDateCounts();
        List<Regist> regists = registRepository.findAll();
        String registCode = regists.get(0).getRegistCode(); 
    	
    	registsAndCounts.put("reserveImage", imageservice.findByRegistCode(registCode) );
    	
    	if (authHeader != null) {
              String token = authHeader.substring(7);
              id = provider.validateAndGetUserId(token); 
              registsAndCounts.put("uesrID", id);
              
              log.info("status login success data"+id);
          } else {
              log.info("status : no login!!! ");
          }

        
        
        return ResponseEntity.ok(registsAndCounts);
    }
    
    @PostMapping("/regist/upload")
    public ResponseEntity<String> uploadReserve(
            @RequestPart(value = "mainImage", required = false) List<MultipartFile> mainImages,
            @RequestParam(value = "existingMainImageIds", required = false) List<String> existingMainImageIds,
            @RequestPart(value = "detailImage", required = false) List<MultipartFile> detailImages,
            @RequestParam(value = "existingDetailImageIds", required = false) List<String> existingDetailImageIds,
            HttpServletRequest request) {

        
        List<RegistDTO> dtoList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();


        if (existingMainImageIds != null && !existingMainImageIds.isEmpty()) {
            for (String jsonString : existingMainImageIds) {
                try {
                    RegistDTO mainImageDTO = objectMapper.readValue(jsonString, RegistDTO.class);
                    dtoList.add(mainImageDTO);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        
        
        if (mainImages != null && !mainImages.isEmpty()) {
            for (MultipartFile file : mainImages) {
                String originalFilename = file.getOriginalFilename();
                System.out.println("New Main Image Content Type: " + file.getContentType());
                System.out.println("New Main Image Original Filename: " + originalFilename);

                try {
                    int lastUnderscoreIndex = originalFilename.lastIndexOf('_');
                    int lastDotIndex = originalFilename.lastIndexOf('.');
                    
                    // _ 뒤에 있는 인덱스 부분 제거, 확장자는 그대로 유지
                    String filenameWithoutIndex = originalFilename.substring(0, lastUnderscoreIndex);
                    String fileExtension = originalFilename.substring(lastDotIndex);
                    String finalFilename = filenameWithoutIndex + fileExtension;

                    // 인덱스 추출 (_ 뒤의 숫자 부분)
                    String indexPart = originalFilename.substring(lastUnderscoreIndex + 1, lastDotIndex);
                    int index = Integer.parseInt(indexPart) + 1;
                    System.out.println("main"+index);
                    RegistDTO dto = new RegistDTO();
                    
                        List<Regist> regists = registRepository.findAll();
                        String registCode = regists.get(0).getRegistCode();
                        
                        dto.setRegistCode(registCode);
                        dto.setImageType("main");
                        dto.setImageOrder(index);
                        dto.setImageName(finalFilename);       
                        dtoList.add(dto);

             
                } catch (Exception e) {
                	log.info("Error processing new main image: " + originalFilename);
                    e.printStackTrace();
                }
            }
        }

        // 3. 기존 상세 이미지 ID 처리
        if (existingDetailImageIds != null && !existingDetailImageIds.isEmpty()) {
            for (String jsonString : existingDetailImageIds) {
                try {
                    RegistDTO detailImageDTO = objectMapper.readValue(jsonString, RegistDTO.class);
                    dtoList.add(detailImageDTO);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        // 4. 새로 업로드된 상세 이미지 처리
        if (detailImages != null && !detailImages.isEmpty()) {
            for (MultipartFile file : detailImages) {
                String originalFilename = file.getOriginalFilename();
                System.out.println("New Detail Image Content Type: " + file.getContentType());
                System.out.println("New Detail Image Original Filename: " + originalFilename);

                try {

                    int lastUnderscoreIndex = originalFilename.lastIndexOf('_');
                    int lastDotIndex = originalFilename.lastIndexOf('.');
                    

                    String filenameWithoutIndex = originalFilename.substring(0, lastUnderscoreIndex);
                    String fileExtension = originalFilename.substring(lastDotIndex);
                    String finalFilename = filenameWithoutIndex + fileExtension;


                    String indexPart = originalFilename.substring(lastUnderscoreIndex + 1, lastDotIndex);
                    int index = Integer.parseInt(indexPart) + 1;
                    System.out.println("detail"+index);
                    RegistDTO dto = new RegistDTO();
                    
                        List<Regist> regists = registRepository.findAll();
                        String registCode = regists.get(0).getRegistCode();
                        
                        dto.setRegistCode(registCode);
                        dto.setImageOrder(index);
                        dto.setImageType("detail");
                        dto.setImageName(finalFilename);
                        
                        dtoList.add(dto);

 
                    
                } catch (Exception e) {
                	log.info("Error processing new detail image: " + originalFilename);
                    e.printStackTrace();
                }
            }
        }// Detail 새이미지 추가 E
        
        

        
        
        
        
        
        
        
        service.saveRegistData(dtoList);

        return ResponseEntity.ok("Images processed successfully.");
    }




	

 

    
	
	

}

