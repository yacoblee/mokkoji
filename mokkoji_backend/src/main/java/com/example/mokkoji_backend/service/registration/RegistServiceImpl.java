package com.example.mokkoji_backend.service.registration;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.domain.RegistDTO;
import com.example.mokkoji_backend.domain.RegistImageDTO;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.entity.registration.RegistImages;
import com.example.mokkoji_backend.repository.registration.RegistImageRepository;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepositoryDSL;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService{
	private final RegistedHistoryRepositoryDSL historyrepository;
	private final RegistRepository repository;
	private final RegistImageRepository imasgrepository;
	
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
        
        
   
        Map<String, Object> result = new HashMap();
        result.put("regists", regists);
        result.put("dateCounts", dateCounts);
        
        return result;
    }
	
	@Override
	@Transactional
	public void saveRegistData(List<RegistImageDTO> dtoList, Regist rdto) {
	  if (dtoList.isEmpty()) {
            return ;
        }
		
		String registCode = dtoList.get(0).getRegistCode(); // PK나 고유 식별자로 사용할 필드
		imasgrepository.deleteByRegistCode(registCode);
		
		for(RegistImageDTO dto: dtoList) {
			System.out.println(dto);
			
			RegistImages registEntity = new RegistImages();
	        registEntity.setRegistCode(dto.getRegistCode());
	        registEntity.setImageName(dto.getImageName());
	        registEntity.setImageOrder(dto.getImageOrder());
	        registEntity.setImageType(dto.getImageType());
	        
        	imasgrepository.save(registEntity);
		}
		rdto.setRegistCode(registCode);
		repository.save(rdto);
	
		
	}
	
 
	
	
}
