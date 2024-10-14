package com.example.mokkoji_backend.domain;


import java.time.LocalDateTime;
import java.util.List;

import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
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
	private int likeCount;
	private int status;
	private int stockCount;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime uploadDate;
	//private List<ProductOptions> options;  // 추가된 필드
	
	
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId,int likeCount ) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
		this.likeCount = likeCount;
	}
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId ,String mainDescription,int likeCount) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
		this.mainDescription = mainDescription;
		this.likeCount = likeCount;
	}
	

//	// 새로운 생성자
//    public ProductsDTO(Long id, String name, int price, String mainImageName, String categoryId, String mainDescription, List<ProductOptions> options) {
//        this.id = id;
//        this.name = name;
//        this.price = price;
//        this.mainImageName = mainImageName;
//        this.categoryId = categoryId;
//        this.mainDescription = mainDescription;
//        this.options = options;  // 필드를 받는 생성자
//    }


	public ProductsDTO(Products product) {
		this.id = product.getId();
		this.name = product.getName();
		this.price = product.getPrice();
		this.mainImageName = product.getMainImageName();
		this.categoryId = product.getCategoryId();
		this.mainDescription = product.getMainDescription();
		this.likeCount = product.getLikeCount();
		//this.options = product.getOptions();  // 연관된 options 필드도 처리
	}
	
}
