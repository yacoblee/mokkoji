package com.example.mokkoji_backend.service.registration;

import com.example.mokkoji_backend.domain.RegistedHistoryDTO;
import jakarta.transaction.Transactional;

import java.util.List;

public interface RegistedHistoryService {

	List<RegistedHistoryDTO> findAllRegList(String userId);

	@Transactional
	List<RegistedHistoryDTO> updateAdultCntAndFindList(String userId, String registId, int adultCnt);

	@Transactional
	List<RegistedHistoryDTO> updateTeenCntAndFindList(String userId, String registId, int teenagerCnt);

	@Transactional
	List<RegistedHistoryDTO> deleteAndFindList(String userId, String registId);
}
