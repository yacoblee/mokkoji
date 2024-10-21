package com.example.mokkoji_backend.repository.goods;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;

import jakarta.transaction.Transactional;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	
	//@EntityGraph(attributePaths = {"options"})
	List<Products> findAll();
	
	List<Products> findByStatus(int status);
	
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
		       + "(p.id, p.name, p.price, p.mainImageName, p.categoryId, p.likeCount) FROM Products p")
		List<ProductsDTO> findList();
	
	@Query("SELECT new com.example.mokkoji_backend.domain.ProductDetailDTO(p) FROM Products p where p.id = :id")
	ProductDetailDTO findDetailinfo(@Param("id") Long id);
	
//	@Query("SELECT new com.example.mokkoji_backend.domain.ProductsDTO"
//			+ "(p.id, p.name, p.price, p.mainImageName, p.categoryId, p.mainDescription,p.like_conut) FROM Products p WHERE p.id = :id")
//	ProductsDTO findDto(@Param("id") Long id);
	
	Page<Products> findAll(Pageable pageable);
	Page<Products> findByCategoryId(String subTypeName,  Pageable pageable);
	
	Page<Products> findByCategoryIdAndNameContaining(String categoryId , String name , Pageable pageable);
	Page<Products> findByNameContaining(String name, Pageable pageable);
	//staus 추가하여 넣기
	Page<Products> findByStatus(int status,Pageable pageable);
	Page<Products> findByCategoryIdAndStatus(String categoryId, int status, Pageable pageable);
	Page<Products> findByCategoryIdAndStatusAndNameContaining(String categoryId , int status, String name , Pageable pageable);
	Page<Products> findByStatusAndNameContaining(int status ,String name, Pageable pageable);
	
	@Query("SELECT p.stockCount FROM Products p WHERE p.id = :id ")
    int getProductStockCount(@Param("id") Long id);
	
	List<Products> findByStockCountLessThanEqual(int stockCount);
	
    @Modifying
    @Transactional
    @Query("UPDATE Products p SET p.likeCount = p.likeCount + 1 WHERE p.id = :productId")
    int increaseLikeCount(@Param("productId") Long productId);
	
    @Modifying
    @Transactional
    @Query("UPDATE Products p SET p.likeCount = p.likeCount - 1 WHERE p.id = :productId")
    int decreaseLikeCount(@Param("productId") Long productId);
	
    @Modifying
    @Transactional
    @Query("UPDATE Products p SET p.stockCount = p.stockCount + :count WHERE p.id = :productId")
    int increaseStockCount(@Param("productId") Long productId, @Param("count") int count);

    @Modifying
    @Transactional
    @Query("UPDATE Products p SET p.stockCount = p.stockCount - :count WHERE p.id = :productId")
    int decreaseStockCount(@Param("productId") Long productId, @Param("count") int count);

//    @EntityGraph(attributePaths = {"options"})
	Optional<Products> findById( Long id);
    


       Page<Products> findByNameContainingAndStatus(String name ,String status,  Pageable pageable);
       //Page<Products> findByStatus(int status,Pageable pageable);
       
       @Query("SELECT p FROM Products p WHERE " +
               "(:name IS NULL OR p.name LIKE %:name%) AND " +
               "(:type IS NULL OR p.categoryId = :type) AND " +
               "(:startDate IS NULL OR p.uploadDate >= :startDate) AND " +
               "(:endDate IS NULL OR p.uploadDate <= :endDate) AND " +
               "(:status IS NULL OR p.status = :status)")
        Page<Products> complexSearch(@Param("name") String name,
                                     @Param("type") String type,
                                     @Param("startDate") LocalDateTime startDate,
                                     @Param("endDate") LocalDateTime endDate,
                                     @Param("status") String status,
                                     Pageable pageable);
 // 날짜 범위 검색 메서드
       Page<Products> findByUploadDateBetween(LocalDateTime startDate, LocalDateTime endDate,Pageable pageable);
}
