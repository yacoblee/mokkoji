package com.example.mokkoji_backend.repository.goods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;

public interface ProductsImagesRepository extends JpaRepository<ProductImages, ProductImagesId>{

	public List<ProductImages> findByProductIdAndType(Long productId, String type);
}
