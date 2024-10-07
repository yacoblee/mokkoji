package com.example.mokkoji_backend.domain;

import com.example.mokkoji_backend.entity.goods.Products;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ProductDetailDTO {
	private Long id;
	private String name;
	private String guide;
	private String sizeInfo;
	private String mainDescription;
	private String subDescription;
	
	   // Products 엔티티를 받는 생성자
    public ProductDetailDTO(Products product) {
        this.id = product.getId();
        this.name = product.getName();
        this.guide = product.getGuide();
        this.sizeInfo = product.getSizeInfo();
        this.mainDescription = product.getMainDescription();
        this.subDescription = product.getSubDescription();
    }
}
