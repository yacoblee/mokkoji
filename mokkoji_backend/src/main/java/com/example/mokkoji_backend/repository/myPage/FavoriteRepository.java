package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorite;
import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

	List<Favorite> findByUserIdOrderByFavoriteDateDesc(String userId);

}
