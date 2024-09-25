package com.example.mokkoji_backend.service.purchase;

import com.example.mokkoji_backend.entity.purchase.PurchaseDetail;

import java.util.List;

public interface PurchaseDetailService {

	List<PurchaseDetail> purchaseDetail(int purchaseNumber);

}
