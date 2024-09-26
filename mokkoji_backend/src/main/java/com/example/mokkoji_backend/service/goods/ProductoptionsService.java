package com.example.mokkoji_backend.service.goods;

import java.util.List;

import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;

public interface ProductoptionsService {
	List<ProductOptions> findAll();

	List<ProductOptions> findByProductId(Long id);

	ProductOptions findById(ProductOptionsId id);

	void save(ProductOptions entity);

	void deleteById(ProductOptionsId id);

}
