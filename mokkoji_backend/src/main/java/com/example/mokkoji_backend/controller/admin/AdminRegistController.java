package com.example.mokkoji_backend.controller.admin;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.domain.RegistDTO;
import com.example.mokkoji_backend.domain.RegistImageDTO;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
import com.example.mokkoji_backend.service.registration.RegistImageService;
import com.example.mokkoji_backend.service.registration.RegistService;
import com.fasterxml.jackson.databind.ObjectMapper;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;



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
    
    @PostMapping(value = "/regist/upload", consumes = { "multipart/form-data" })
    public ResponseEntity<String> uploadReserve(      
    		@RequestPart(value = "mainImage", required = false) List<MultipartFile> mainImages,
            @RequestParam(value = "existingMainImageIds", required = false) List<String> existingMainImageIds,
            @RequestPart(value = "detailImage", required = false) List<MultipartFile> detailImages,
            @RequestParam(value = "existingDetailImageIds", required = false) List<String> existingDetailImageIds,
            @RequestParam(value = "deleteImageIds", required = false) List<String> deleteFiles,
            @RequestPart(value = "reserveData", required = false) RegistDTO reserveData,
            HttpServletRequest request) { 
    	
    	String realPath = request.getServletContext().getRealPath("/resources/reserveImages/");
    	
    	
    	List<RegistImageDTO> dtoList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
       
    	
    	
    	File dir = new File(realPath);
   	    if (!dir.exists()) {
   	        dir.mkdirs();
   	    }
    	
    	//기존 이미지 삭제
	   	 if (deleteFiles != null && !deleteFiles.isEmpty()) {
	   	    try {
	   	        for (String jsonString : deleteFiles) {
	    
	   	        	jsonString = jsonString.trim();

	   	            File oldFile = new File(realPath + "/" + jsonString);
	   	            if (oldFile.exists()) {
	   	                if (oldFile.delete()) {
	   	                    System.out.println("Deleted file: " + oldFile.getName());
	   	                } else {
	   	                    System.out.println("Failed to delete file: " + oldFile.getName());
	   	                }
	   	            }
	   	        }
	   	    } catch (Exception e) {
	   	        log.info("Failed to parse deleteFiles: " + deleteFiles);
	   	        e.printStackTrace();
	   	    }
	   	}


        if (existingMainImageIds != null && !existingMainImageIds.isEmpty()) {
            for (String jsonString : existingMainImageIds) {
                try {
                	RegistImageDTO mainImageDTO = objectMapper.readValue(jsonString, RegistImageDTO.class);
                    dtoList.add(mainImageDTO);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        
        
        if (mainImages != null && !mainImages.isEmpty()) {
            for (MultipartFile file : mainImages) {
                String originalFilename = file.getOriginalFilename();

                try {
                    int lastUnderscoreIndex = originalFilename.lastIndexOf('_');
                    int lastDotIndex = originalFilename.lastIndexOf('.');
                    
                     
                    String filenameWithoutIndex = originalFilename.substring(0, lastUnderscoreIndex);
                    String fileExtension = originalFilename.substring(lastDotIndex);
                    String finalFilename = filenameWithoutIndex + fileExtension;

            
                    String indexPart = originalFilename.substring(lastUnderscoreIndex + 1, lastDotIndex);
                    int index = Integer.parseInt(indexPart) + 1;

      	            file.transferTo(new File(realPath+ "/"+ finalFilename)); // 파일 저장
         
      	          RegistImageDTO dto = new RegistImageDTO();
                    
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

 
        if (existingDetailImageIds != null && !existingDetailImageIds.isEmpty()) {
            for (String jsonString : existingDetailImageIds) {
                try {
                	RegistImageDTO detailImageDTO = objectMapper.readValue(jsonString, RegistImageDTO.class);
                     
                    dtoList.add(detailImageDTO);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

 
        if (detailImages != null && !detailImages.isEmpty()) {
            for (MultipartFile file : detailImages) {
                String originalFilename = file.getOriginalFilename();
                try {
                	
                    int lastUnderscoreIndex = originalFilename.lastIndexOf('_');
                    int lastDotIndex = originalFilename.lastIndexOf('.');
                    

                    String filenameWithoutIndex = originalFilename.substring(0, lastUnderscoreIndex);
                    String fileExtension = originalFilename.substring(lastDotIndex);
                    String finalFilename = filenameWithoutIndex + fileExtension;


                    String indexPart = originalFilename.substring(lastUnderscoreIndex + 1, lastDotIndex);
                    int index = Integer.parseInt(indexPart) + 1;
                    
                    
                    file.transferTo(new File(realPath+ "/"+ finalFilename)); // 파일 저장
                    
                    RegistImageDTO dto = new RegistImageDTO();
                    
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
        }// Detail 새 이미지 추가 E
        
        System.out.println("@@@@@@@@@@@@@@@@@"+reserveData);
        Regist regist = Regist.fromDTO(reserveData);
        service.saveRegistData(dtoList, regist);
        
        return ResponseEntity.ok("Images processed successfully.");
    }




	

 

    
	
	

}

