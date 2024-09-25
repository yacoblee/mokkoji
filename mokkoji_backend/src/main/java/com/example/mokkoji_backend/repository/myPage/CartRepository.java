package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {

	// cart를 userId로 조회, 날짜순으로 내림차순
	List<Cart> findByUserIdOrderByCartDateDesc(String userId);

	// cart 수정
	@Modifying
	@Query("UPDATE Cart AS c SET c.productCnt = :productCnt, c.productTotalPrice = :productTotalPrice WHERE c.userId = :userId AND c.productId = :productId AND c.optionContent = :optionContent AND c.packagingOptionContent = :packagingOptionContent")
	void updateByUserIdAndProductIdAndOptionContentAndPackagingOptionContent(@Param("userId") String userId, @Param("productId") int productId, @Param("optionContent") String optionContent, @Param("packagingOptionContent") String packagingOptionContent, @Param("productCnt") int productCnt, @Param("productTotalPrice") int productTotalPrice);

}
