package com.example.mokkoji_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.Productoptions;
import com.example.mokkoji_backend.entity.ProductoptionsId;

public interface ProductOptionsRepository extends JpaRepository<Productoptions, ProductoptionsId>{

	List<Productoptions> findByProductId(Long product_id);
}
