package com.example.mokkoji_backend.service.registration;


import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.domain.RegistDTO;
import com.example.mokkoji_backend.domain.RegistImageDTO;
import com.example.mokkoji_backend.entity.registration.Regist;

import java.util.List;
import java.util.Map;



public interface RegistService {
	
	List<Regist> getAllRegists();
    
	
	List<DateCountDTO> getCountsDays();
	
	Map<String, Object> getRegistsAndDateCounts();
	
	void saveRegistData(List<RegistImageDTO> dto, Regist rdto);
	
}
