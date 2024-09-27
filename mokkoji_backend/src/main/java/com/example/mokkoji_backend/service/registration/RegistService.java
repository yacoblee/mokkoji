package com.example.mokkoji_backend.service.registration;


import java.util.List;
import java.util.Map;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.entity.registration.Regist;



public interface RegistService {
	
	List<Regist> getAllRegists();
    
	
	List<DateCountDTO> getCountsDays();
	
	Map<String, Object> getRegistsAndDateCounts();
}
