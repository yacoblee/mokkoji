package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorite;
import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

	// favorite를 userId로 조회, 날짜순으로 내림차순
	List<Favorite> findByUserIdOrderByFavoriteDateDesc(String userId);

	// favorite에서 row 삭제
	void deleteById(@NonNull FavoriteId favoriteId);

}
