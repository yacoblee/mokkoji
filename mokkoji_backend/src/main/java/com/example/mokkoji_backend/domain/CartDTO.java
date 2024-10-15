package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDTO {
	private String userId;
	private long productId;
	private String optionContent;
	private String packagingOptionContent;
	private int productCnt;
	private int productTotalPrice;
	private LocalDateTime cartDate;

	private int optionPrice;
	private int packagingOptionPrice;

	private String productName;
	private int price;
	private String categoryId;
	private String mainImageName;
	private int stockCount;
}
