package com.example.mokkoji_backend.repository;


import static com.example.mokkoji_backend.entity.QProducts.products;
import static com.example.mokkoji_backend.entity.QProductOptions.productOptions;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductsDSLRepositoryImpl implements ProductsDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;
    // 생성을 위한 Bean 설정을 DemoConfig에 추가해야함.
	
	@Override
	public List<ProductsDTO> findByJoinList() {
		
		return jpaQueryFactory.select(
			     Projections.bean(ProductsDTO.class, 
			             products.id,
			             products.categoryId,
			             products.name,
			             products.price, 
			             products.sizeInfo, 
			             products.guide,
			             products.mainDescription, 
			             products.sub_description, 
			             products.like_conut, 
			             products.status, 
			             products.stock_count, 
			             products.uploadDate
			         )).from(products).join(productOptions).on(products.id.eq(productOptions.productId)).fetchJoin().fetch();
	}

	
	@Override
	public ProductsDTO findByJoinOne(Long id) {
		return jpaQueryFactory.select(
			     Projections.bean(ProductsDTO.class, 
			             products.id,
			             products.categoryId,
			             products.name,
			             products.price, 
			             products.sizeInfo, 
			             products.guide,
			             products.mainDescription, 
			             products.sub_description, 
			             products.like_conut, 
			             products.status, 
			             products.stock_count, 
			             products.uploadDate
			         )).from(products).join(productOptions).on(products.id.eq(productOptions.productId))
				.where(products.id.eq(id)).fetchJoin().fetchOne();
	}
}