package com.example.mokkoji_backend.repository.registration;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.entity.registration.Registedhistory;
import com.example.mokkoji_backend.entity.registration.RegistedhistoryId;

@Repository
public interface RegistedHistoryRepository extends JpaRepository<Registedhistory, RegistedhistoryId>{

	
	// 특정 유저의 예약 내역 조회
    List<Registedhistory> findByUser_UserId(String userId);

    
 
    // 예약된 특정 날짜에 예약된 내역 조회
    @Query("SELECT COUNT(r) FROM Registedhistory r WHERE r.regDate BETWEEN :startDate AND :endDate GROUP BY r.regDate")
    List<DateCountDTO> countByRegDate(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);
 
}
