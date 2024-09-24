package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoptionsDTO {
	private Long productId;
	private String content;
	private int price;
}
