package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {

	// cart를 userId로 조회, 날짜순으로 내림차순
	List<Cart> findByUserIdOrderByCartDateDesc(String userId);

	// cart 수정
	@Modifying
	@Transactional
	@Query("UPDATE Cart AS c SET c.productCnt = :productCnt, c.productTotalPrice = :productTotalPrice WHERE c.userId = :userId AND c.productId = :productId AND c.optionContent = :optionContent AND c.packagingOptionContent = :packagingOptionContent")
	void updateCart(@Param("userId") String userId, @Param("productId") long productId, @Param("optionContent") String optionContent, @Param("packagingOptionContent") String packagingOptionContent, @Param("productCnt") int productCnt, @Param("productTotalPrice") int productTotalPrice);

	// cart 개수 계산
	int countByUserId(String userId);

	// 단품 구매시 장바구니 불러올때 , id를 제외한 나머지 리스트 반환
	List<Cart> findByUserIdAndProductIdAndOptionContentAndPackagingOptionContentNot
	(String userId, long productId, String optionContent, String packagingOptionContent);
	
	@Query("SELECT c FROM Cart c WHERE NOT (c.userId != :userId AND c.productId = :productId AND c.optionContent = :optionContent AND c.packagingOptionContent = :packagingOptionContent)")
	List<Cart> findByExcludingSpecificCart(@Param("userId") String userId, @Param("productId") long productId, @Param("optionContent") String optionContent, @Param("packagingOptionContent") String packagingOptionContent);

}
