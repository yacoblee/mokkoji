package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;

import java.util.List;
import java.util.Optional;

public interface ProductoptionsService {
	List<ProductOptions> findAll();

	List<ProductOptions> findByProductId(Long id);

	Optional<ProductOptions> findById(ProductOptionsId id);

	void save(ProductOptions entity);

	void deleteById(ProductOptionsId id);

}
