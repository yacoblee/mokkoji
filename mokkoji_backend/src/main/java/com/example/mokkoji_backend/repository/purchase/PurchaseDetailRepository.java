package com.example.mokkoji_backend.repository.purchase;

import com.example.mokkoji_backend.entity.purchase.PurchaseDetail;
import com.example.mokkoji_backend.entity.purchase.PurchaseDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, PurchaseDetailId> {

	// purchaseNumber에 대해 상세정보 조회
	List<PurchaseDetail> findByPurchaseNumberOrderByProductId(int purchaseNumber);

}
