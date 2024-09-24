package com.example.mokkoji_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	//@EntityGraph(attributePaths = {"options"})
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
			+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId,p.guide) FROM Products p where p.categoryId=:categoryId")
	List<ProductsDTO> findByCategoryId(@Param("categoryId") String categoryId);
	
	//@EntityGraph(attributePaths = {"options"})
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
			+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId) FROM Products p")
	List<ProductsDTO> findList();
	
	@EntityGraph(attributePaths = {"options"})
	List<Products> findAll();
	
	@EntityGraph(attributePaths = {"options"})
	Optional<Products> findById(Long id);
}
