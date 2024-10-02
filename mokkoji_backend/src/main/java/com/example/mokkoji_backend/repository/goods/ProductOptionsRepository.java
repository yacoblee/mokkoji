package com.example.mokkoji_backend.repository.goods;

import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOptionsRepository extends JpaRepository<ProductOptions, ProductOptionsId>{

	List<ProductOptions> findByProductId(Long product_id);
}
