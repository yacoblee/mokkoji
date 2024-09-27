package com.example.mokkoji_backend.controller;

 
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mokkoji_backend.service.registration.RegistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class RegistController {
	@Autowired
	private final RegistService service;

 

    @GetMapping("/reserve")
    public ResponseEntity<Map<String,Object>> getRegistsAndCounts( ) {
    	Map<String, Object> registsAndCounts = service.getRegistsAndDateCounts();
		
    	
    	log.info("**********/reserve test");
        System.out.println("Registration Page"+registsAndCounts);
        return ResponseEntity.ok(registsAndCounts);
    }
	
	
	
	

}
