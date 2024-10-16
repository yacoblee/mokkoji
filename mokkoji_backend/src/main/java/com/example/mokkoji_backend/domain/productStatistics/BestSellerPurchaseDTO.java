package com.example.mokkoji_backend.domain.productStatistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BestSellerPurchaseDTO {
	
	private Long productId;
	private String productName;
	private int productPrice;
	private String mainImageName;
	private int likeCount;
	private int totalPrice;

	
}
