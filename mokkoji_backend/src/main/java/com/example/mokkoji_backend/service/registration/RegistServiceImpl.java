package com.example.mokkoji_backend.service.registration;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.DateCountDTO;
 
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService{
	private final RegistedHistoryRepository repository;
	
	
	@Override
	public List<DateCountDTO> getCountsDays(){
		 Timestamp endDate = Timestamp.valueOf(LocalDateTime.now());
		 Timestamp startDate = Timestamp.valueOf(LocalDateTime.now().minusDays(30));
		    
		    return repository.countByRegDate(startDate, endDate);
	}
}
