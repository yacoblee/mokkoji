package com.example.mokkoji_backend.repository.goods;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductsImagesRepository extends JpaRepository<ProductImages, ProductImagesId>{

	public List<ProductImages> findByProductIdAndType(Long productId, String type);
	public List<ProductImages> findByProductId(Long productId);
}
