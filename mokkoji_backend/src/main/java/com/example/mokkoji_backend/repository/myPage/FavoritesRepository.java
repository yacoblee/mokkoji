package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, FavoritesId> {

	// favorite를 userId로 조회, 날짜순으로 내림차순
	List<Favorites> findByUserIdOrderByFavoriteDateDesc(String userId);

	Page<Favorites> findByUserIdOrderByFavoriteDateDesc(String userId, Pageable pageable);

	// 한 상품에 대한 favorite의 총 개수
	int countByProductId(long productId);

	// user 별 찜목록 개수
	int countByUserId(String userId);

}
