package com.example.mokkoji_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	List<Products> findByCategoryId(String id);
}
