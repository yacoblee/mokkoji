package com.example.mokkoji_backend.repository.purchase;

import com.example.mokkoji_backend.entity.purchase.Purchase;
import com.example.mokkoji_backend.entity.purchase.PurchaseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, PurchaseId> {

	// userId로 구메내역 조회
	List<Purchase> findByUserIdOrderByRegDateDesc(String userId);

}
