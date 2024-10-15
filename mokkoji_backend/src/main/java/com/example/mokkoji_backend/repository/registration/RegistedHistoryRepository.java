package com.example.mokkoji_backend.repository.registration;


import com.example.mokkoji_backend.domain.RegistedHistoryDTO;
import com.example.mokkoji_backend.entity.registration.Registedhistory;
import com.example.mokkoji_backend.entity.registration.RegistedhistoryId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistedHistoryRepository extends JpaRepository<Registedhistory, RegistedhistoryId>{

//	@Modifying
//	@Transactional
//	@Query("UPDATE Registedhistory AS r SET r.adultCnt = :adultCnt WHERE r.userId = :userId AND r.registId = :registId")
//	void changeAdultCnt(@Param("userId") String userId, @Param("registId") int registId, @Param("adultCnt") int adultCnt);
//
//	@Modifying
//	@Transactional
//	@Query("UPDATE Registedhistory AS r SET r.teenagerCnt = :teenagerCnt WHERE r.userId = :userId AND r.registId = :registId")
//	void changeTeenCnt(@Param("userId") String userId, @Param("registId") int registId, @Param("adultCnt") int teenagerCnt);

}
