package com.example.mokkoji_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.ProductOptions;
import com.example.mokkoji_backend.entity.id.ProductOptionsId;

public interface ProductOptionsRepository extends JpaRepository<ProductOptions, ProductOptionsId>{

	List<ProductOptions> findByProductId(Long product_id);
}
