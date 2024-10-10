package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;

import java.util.List;

public interface ProductImageService {
	List<ProductImages> findAll();

	List<ProductImages> findByProductIdAndType(Long productId, String type);
	List<ProductImages> findByProductId(Long productId);
	
	ProductImages findById(ProductImagesId id);

	void save(ProductImages options);

	void deleteById(ProductImagesId id);
}
