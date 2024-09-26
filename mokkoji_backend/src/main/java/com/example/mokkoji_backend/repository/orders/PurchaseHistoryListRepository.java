package com.example.mokkoji_backend.repository.purchase;

import com.example.mokkoji_backend.entity.purchase.PurchaseHistoryId;
import com.example.mokkoji_backend.entity.purchase.PurchaseHistoryList;
import com.example.mokkoji_backend.entity.purchase.PurchaseHistoryListId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseHistoryListRepository extends JpaRepository<PurchaseHistoryList, PurchaseHistoryListId> {

	// userId로 List 출력
//	List<PurchaseHistoryList> findByUserIdOrderByPurchaseNumberDesc(PurchaseHistoryId purchaseHistoryId);>

}
