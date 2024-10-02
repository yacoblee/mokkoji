package com.example.mokkoji_backend.domain;


import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductsDTO {
	private Long id;
	private String name;
	private int price;

	private String mainDescription;

	private String mainImageName;

	private String categoryId;
	private List<ProductOptions> options;  // 추가된 필드
	
	
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId ) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
	}
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId ,String mainDescription) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
		this.mainDescription = mainDescription;
	}
	

	// 새로운 생성자
    public ProductsDTO(Long id, String name, int price, String mainImageName, String categoryId, String mainDescription, List<ProductOptions> options) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.mainImageName = mainImageName;
        this.categoryId = categoryId;
        this.mainDescription = mainDescription;
        this.options = options;  // 필드를 받는 생성자
    }


	public ProductsDTO(Products product) {
		this.id = product.getId();
		this.name = product.getName();
		this.price = product.getPrice();
		this.mainImageName = product.getMainImageName();
		this.categoryId = product.getCategoryId();
		this.mainDescription = product.getMainDescription();
		this.options = product.getOptions();  // 연관된 options 필드도 처리
	}
	
}
