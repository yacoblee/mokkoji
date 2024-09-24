package com.example.mokkoji_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.goods.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	@EntityGraph(attributePaths = {"options"})
	List<Products> findByCategoryId(String id);
	
	
	@EntityGraph(attributePaths = {"options"})
	List<Products> findAll();
	
	@EntityGraph(attributePaths = {"options"})
	Optional<Products> findById(Long id);
}
