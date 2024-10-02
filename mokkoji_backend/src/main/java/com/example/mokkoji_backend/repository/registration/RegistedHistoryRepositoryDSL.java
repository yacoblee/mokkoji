package com.example.mokkoji_backend.repository.registration;

import com.example.mokkoji_backend.domain.DateCountDTO;

import java.sql.Timestamp;
import java.util.List;


 
public interface RegistedHistoryRepositoryDSL {

	
	// 특정 유저의 예약 내역 조회
//	List<Registedhistory> findByUser_UserId(String userId);

	 List<DateCountDTO> countByRegDate(Timestamp startDate, Timestamp endDate);
 
 
}
