package com.example.mokkoji_backend.repository.goods;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	
	@EntityGraph(attributePaths = {"options"})
	List<Products> findAll();
	
	//@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
	//		+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId,p.mainDescription) FROM Products p where p.categoryId=:categoryId")
	Page<Products> findByCategoryId(String subTypeName,  Pageable pageable);
	
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
			+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId) FROM Products p")
	List<ProductsDTO> findList();
	
    // 네이티브 쿼리를 이용하여 상위 4개의 count가 높은 엔터티 조회
    //@Query(value = "SELECT * FROM products p WHERE p.product_id not in (:product_id) ORDER BY p.stock_count DESC LIMIT 4", nativeQuery = true)
    //List<Products> findTop4ByOrderByCountDescNative(@Param("product_id") Long product_id);
	
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductDetailDTO(p) FROM Products p where p.id = :id")
	ProductDetailDTO findDetailinfo(@Param("id") Long id);
	
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
			+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId, p.mainDescription) FROM Products p WHERE p.id = :id")
	ProductsDTO findDto(@Param("id") Long id);
	
	//@Query("SELECT p FROM Products p WHERE p.type = :type AND p.name LIKE %:keyword%")
	//Page<Products> findByKeywordAndType(@Param("keyword") String keyword, @Param("type") String type, Pageable pageable);
	
	Page<Products> findAll(Pageable pageable);
	
	Page<Products> findByCategoryIdAndNameContaining(String categoryId , String name , Pageable pageable);
	
	Page<Products> findByNameContaining(String name, Pageable pageable);
	
	
	//int countByCategoryId(String subTypeName);
	//int countBy();
	
	
	@EntityGraph(attributePaths = {"options"})
	Optional<Products> findById( Long id);
}
