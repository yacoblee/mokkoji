package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import com.example.mokkoji_backend.entity.myPage.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

	List<Favorite> findByUserIdOrderByFavoriteDateDesc(String userId);

}
