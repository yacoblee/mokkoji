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
	private String optionContent;
	private String packagingContent;
	private int productCnt;
	private int productTotalPrice;
	private String productName;
	private String categoryId;
	private String mainImageName;
	private int productPrice;
	private int optionPrice;
	private int packagingPrice;
}
