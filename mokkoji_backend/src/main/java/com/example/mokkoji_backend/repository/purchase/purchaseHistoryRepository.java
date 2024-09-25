package com.example.mokkoji_backend.repository.purchase;

import com.example.mokkoji_backend.entity.purchase.PurchaseHistory;
import com.example.mokkoji_backend.entity.purchase.PurchaseHistoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface purchaseHistoryRepository extends JpaRepository<PurchaseHistory, PurchaseHistoryId> {

	// 구메내역 조회


}
