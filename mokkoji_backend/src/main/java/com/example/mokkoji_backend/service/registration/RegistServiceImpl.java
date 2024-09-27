package com.example.mokkoji_backend.service.registration;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepositoryDSL;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService{
	private final RegistedHistoryRepositoryDSL historyrepository;
	private final RegistRepository repository;
	@Override
	public List<Regist> getAllRegists() {
		
	 
		 return repository.findAll();
	}
	
	
	
	@Override
	public List<DateCountDTO> getCountsDays(){
	    LocalDate endLocalDate = LocalDate.now().plusDays(30);  
	    LocalDate startLocalDate = LocalDate.now();  

	    Timestamp startDate = Timestamp.valueOf(startLocalDate.atStartOfDay());
	    Timestamp endDate = Timestamp.valueOf(endLocalDate.atStartOfDay());
		
	    return historyrepository.countByRegDate(startDate, endDate);
	}
	
    
	@Override
    public Map<String, Object> getRegistsAndDateCounts() {
        List<Regist> regists = getAllRegists();  // Regist 리스트 가져오기
        List<DateCountDTO> dateCounts = getCountsDays();  // 날짜별 Count 가져오기
        
        System.out.println("(*()*()*()*()*()*)*)("+dateCounts);
   
        Map<String, Object> result = new HashMap();
        result.put("regists", regists);
        result.put("dateCounts", dateCounts);

        return result;
    }
	
	
}
