package com.example.mokkoji_backend.repository.goods;


import static com.example.mokkoji_backend.entity.goods.QProductOptions.productOptions;
import static com.example.mokkoji_backend.entity.goods.QPackaging.packaging;
import static com.example.mokkoji_backend.entity.goods.QProducts.products;
import static com.example.mokkoji_backend.entity.orders.QOrdersDetail.ordersDetail;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.domain.productStatistics.SumOptionsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductsDSLRepositoryImpl implements ProductsDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;
    // 생성을 위한 Bean 설정을 DemoConfig에 추가해야함.
	

	
	@Override
	public List<ProductsDTO> recommendList(Long id) {
		
		return jpaQueryFactory.select(Projections.bean(ProductsDTO.class, 
				products.id,
	             products.categoryId,
	             products.name,
	             products.price, 
	             products.mainDescription,
	             products.mainImageName

				)).from(products).where(products.id.ne(id).and(products.status.eq(0))).orderBy(products.status.desc()).limit(4).fetch();
	}
	
	@Override
	public ProductsDTO entityToDto(Products items) {
		
	    // QueryDSL을 사용하여 DTO로 변환
	    return jpaQueryFactory
	            .select(Projections.bean(ProductsDTO.class, 
	                    products.id,
	                    products.categoryId,
	                    products.name,
	                    products.price,
	                    products.mainDescription,
	                    products.mainImageName,
	                    products.likeCount,
	                    products.status,
	                    products.stockCount,
	                    products.uploadDate
	            ))
	            .from(products)
	            .where(products.id.eq(items.getId())) // 전달된 엔티티의 ID를 기준으로 필터링
	            .fetchOne();
	}
	@Override
	public List<SumOptionsDTO> sumOptions(Long productId){
		return jpaQueryFactory
				.select(Projections.bean(SumOptionsDTO.class,
						ordersDetail.productCnt.sum().as("sumProductCnt"),
						productOptions.content.as("optionContent"),
						productOptions.price.as("optionPrice"),
						packaging.packagingContent.as("packagingContent"),
						packaging.packagingPrice.as("packagingPrice")))
					.from(ordersDetail)
					.join(productOptions)
					.on(ordersDetail.optionContent.eq(productOptions.content)
							.and(ordersDetail.productId.eq(productOptions.productId)))
					.join(packaging)
					.on(ordersDetail.packagingOptionContent.eq(packaging.packagingContent))
					.where(ordersDetail.productId.eq(productId))
					.groupBy(ordersDetail.optionContent,ordersDetail.packagingOptionContent)
					.fetch();
	}
}
