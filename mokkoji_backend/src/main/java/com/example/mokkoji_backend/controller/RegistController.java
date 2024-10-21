package com.example.mokkoji_backend.controller;


import com.example.mokkoji_backend.config.NaverMainConfig;
import com.example.mokkoji_backend.domain.PaymentRequestDto;
import com.example.mokkoji_backend.domain.RegistedHistoryDTO;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.PaymentService;
import com.example.mokkoji_backend.service.registration.RegistImageService;
import com.example.mokkoji_backend.service.registration.RegistService;
import com.example.mokkoji_backend.service.registration.RegistedHistoryService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class RegistController {
	
	private final RegistService service;
	private final RegistImageService imageservice;
	private final TokenProvider provider;
	private final PaymentService paymentService;
	private final RegistedHistoryService registedHistoryService;
	private final NaverMainConfig mainConfig;
	
	
	private IamportClient iamportClient;

	private final TokenProvider tokenProvider;

	public String getUserIdFromHeader(String header) {
		return tokenProvider.validateAndGetUserId(header.substring(7));
	}

	@PostConstruct
    public void init() {
        String apiKey = mainConfig.getImpkey();
        String apiSecret = mainConfig.getImpsecretkey();

        this.iamportClient = new IamportClient(apiKey, apiSecret);
    }
	

    @GetMapping("/reserve")
    public ResponseEntity<Map<String,Object>> getRegistsAndCounts(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String id = null; 
      
    	
    	Map<String, Object> registsAndCounts = service.getRegistsAndDateCounts();
		
    	
    	registsAndCounts.put("reserveImage", imageservice.findByRegistCode("04RS") );
    	  if (authHeader != null) {
              String token = authHeader.substring(7);
              id = provider.validateAndGetUserId(token); // 토큰으로부터 사용자 ID 추출  request.setUserId(id); // 추출한 ID를 DTO에 세팅
              registsAndCounts.put("uesrID", id);
              
              log.info("status login success data"+id);
          } else {
              log.info("status : does not login!!! ");
          }
    	
        System.out.println("Registration Page"+registsAndCounts);
        
        
        return ResponseEntity.ok(registsAndCounts);
    }
	

    @PostMapping("/purchase/{imp_uid}")
    public Payment preparePayment(
		@RequestHeader(value = "Authorization", required = false) String authHeader,
		@RequestBody PaymentRequestDto request,
    	@PathVariable String imp_uid) throws IamportResponseException, IOException {
    	

    	String id = null; 
        if (authHeader != null) {
            String token = authHeader.substring(7);
            id = provider.validateAndGetUserId(token);
            request.setUserId(id);
            log.info("status login success data"+id);
        } else {
            log.info("status : no login!!! ");
        }
        
        request.setUserId("user1");
 
        try {
        	IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);;			
        	paymentService.postPrepare(request);

        	return payment.getResponse();
		} catch (Exception e) {
			
			
			log.info("Payment Action Failed : "+e.toString());
			return null;
		}
        
        
        
    }

	// ** 마이페이지에서 사용 ================================================================

	// 1. 리스트 끌고오기
	@GetMapping("/mypage/book")
	public ResponseEntity<?> findRegistAllList(@RequestHeader("Authorization") String header){
		String userId = getUserIdFromHeader(header);

		try{
			List<RegistedHistoryDTO> registedHistoryDTOList = registedHistoryService.findAllRegList(userId);

			log.warn(registedHistoryDTOList);

			return ResponseEntity.ok(registedHistoryDTOList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : findRegistAllList");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : findRegistAllList");
		}
	}
	
	// 2. 수량 수정
	// 2.1. 성인
	@PatchMapping("/mypage/adult/{registId}/{adultCnt}")
	public ResponseEntity<?> changeAdultCnt(@RequestHeader("Authorization") String header, @PathVariable("registId") String registId, @PathVariable("adultCnt") int adultCnt){
		String userId = getUserIdFromHeader(header);
		log.info("UserId: {}, RegistId: {}, AdultCnt: {}", userId, registId, adultCnt);

		try{
			List<RegistedHistoryDTO> registedHistoryDTOList = registedHistoryService.updateAdultCntAndFindList(userId, registId, adultCnt);
			log.warn(registedHistoryDTOList);
			return ResponseEntity.ok(registedHistoryDTOList);
		} catch (Exception e) {
			log.warn("내부 서버 오류 : changeAdultCnt");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : changeAdultCnt");
		}
	}

	// 2.2. 청소년
	@PatchMapping("/mypage/teen/{registId}/{teenagerCnt}")
	public ResponseEntity<?> changeTeenCnt(@RequestHeader("Authorization") String header, @PathVariable("registId") String registId, @PathVariable("teenagerCnt") int teenagerCnt){
		String userId = getUserIdFromHeader(header);
		log.info("UserId: {}, RegistId: {}, teenagerCnt: {}", userId, registId, teenagerCnt);

		try{
			List<RegistedHistoryDTO> registedHistoryDTOList = registedHistoryService.updateTeenCntAndFindList(userId, registId, teenagerCnt);
			log.warn(registedHistoryDTOList);
			return ResponseEntity.ok(registedHistoryDTOList);
		} catch (Exception e) {
			log.warn("내부 서버 오류 : changeTeenCnt");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : changeTeenCnt");
		}
	}
	
	// 3. 일정 삭제
	@DeleteMapping("/mypage/{registId}")
	public ResponseEntity<?> deleteRegist(@RequestHeader("Authorization") String header, @PathVariable("registId") String registId){
		String userId = getUserIdFromHeader(header);

		try{
			List<RegistedHistoryDTO> registedHistoryDTOList = registedHistoryService.deleteAndFindList(userId, registId);

			return ResponseEntity.ok(registedHistoryDTOList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : deleteRegist");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : deleteRegist");
		}
	}

}

