package com.example.mokkoji_backend.service.purchase;

import com.example.mokkoji_backend.entity.purchase.Purchase;
import com.example.mokkoji_backend.repository.purchase.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	PurchaseRepository purchaseRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 구매내역 조회
	@Override
	public List<Purchase> userPurchases(String userId) {
		return purchaseRepository.findByUserIdOrderByRegDateDesc(userId);
	}

}
