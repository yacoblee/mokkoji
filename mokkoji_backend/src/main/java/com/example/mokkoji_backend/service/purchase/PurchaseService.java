package com.example.mokkoji_backend.service.purchase;

import com.example.mokkoji_backend.entity.purchase.Purchase;

import java.util.List;

public interface PurchaseService {

	List<Purchase> userPurchases(String userId);

}
