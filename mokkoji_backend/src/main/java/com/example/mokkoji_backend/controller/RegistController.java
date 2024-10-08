package com.example.mokkoji_backend.controller;


import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PaymentRequestDto;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.PaymentService;
import com.example.mokkoji_backend.service.registration.RegistImageService;
import com.example.mokkoji_backend.service.registration.RegistService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class RegistController {
	
	private final RegistService service;
	private final RegistImageService imageservice;
	private final TokenProvider provider;
	private final PaymentService paymentService;
	
	
	private IamportClient iamportClient;

	@PostConstruct
    public void init() {
        this.iamportClient = new IamportClient("2533046824212561", "Kc9bnIDch7znR6cdCX024s352Pq8YHDbfPDR0kCllDkvZEjY1iTweOxXcMHxUEX2LLa3ws5YhPYnySmk");
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
              log.info("status : no login!!! ");
          }
    	
    	
    	
    	
    	System.out.println("Registration Image"+imageservice.findByRegistCode("04RS"));
    	log.info("**********/reserve test");
        System.out.println("Registration Page"+registsAndCounts);
        
        
        return ResponseEntity.ok(registsAndCounts);
    }
	

    @PostMapping("/purchase/{imp_uid}")
    public Payment preparePayment(
		@RequestHeader(value = "Authorization", required = false) String authHeader,
		@RequestBody PaymentRequestDto request,
    	@PathVariable String imp_uid) throws IamportResponseException, IOException {
    	System.out.println("@@@@@@@@@@@@@@@@@@@imp_uid "+imp_uid);
        String id = null; 
        if (authHeader != null) {
            String token = authHeader.substring(7);
            id = provider.validateAndGetUserId(token); // 토큰으로부터 사용자 ID 추출
            request.setUserId(id); // 추출한 ID를 DTO에 세팅
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

    
	
	

}

