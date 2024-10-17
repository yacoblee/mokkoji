package com.example.mokkoji_backend.service.registration;

import com.example.mokkoji_backend.domain.RegistedHistoryDTO;
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepository;
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepositoryDSL;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service("RegistedHistoryService")
public class RegistedHistoryServiceImpl implements RegistedHistoryService {


	private final RegistedHistoryRepositoryDSL registedHistoryRepositoryDSL;
	private final RegistedHistoryRepository registedHistoryRepository;

	@Override
	public List<RegistedHistoryDTO> findAllRegList(String userId) {
		return registedHistoryRepositoryDSL.findByUserIdList(userId);
	}

	@Override
	@Transactional
	public List<RegistedHistoryDTO> updateAdultCntAndFindList(String userId, String registId, int adultCnt){
		registedHistoryRepositoryDSL.changeAdultCnt(userId, registId, adultCnt);
		return registedHistoryRepositoryDSL.findByUserIdList(userId);
	}

	@Transactional
	@Override
	public List<RegistedHistoryDTO> updateTeenCntAndFindList(String userId, String registId, int teenagerCnt){
		registedHistoryRepositoryDSL.changeTeenCnt(userId, registId, teenagerCnt);
		return registedHistoryRepositoryDSL.findByUserIdList(userId);
	}

	@Transactional
	@Override
	public List<RegistedHistoryDTO> deleteAndFindList(String userId, String registId) {
		registedHistoryRepository.deleteById(registId);
		return registedHistoryRepositoryDSL.findByUserIdList(userId);
	}

}
