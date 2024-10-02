package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductBuyDTO {
	private String userId;
	private long productId;
	private String categoryId;
	private String productName;
	private String mainImageName;
	private int productPrice;
	private String optionContent;
	private int optionPrice;
	private String packagingContent;
	private int packagingPrice;
	private int productCnt;
	private int productTotalPrice;
}
