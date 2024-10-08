package com.example.mokkoji_backend.controller.admin;


import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.domain.PaymentRequestDto;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
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
	

 

    
	
	

}

