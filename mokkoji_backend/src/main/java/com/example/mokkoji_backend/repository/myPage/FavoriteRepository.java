package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.myPage.Favorite;
import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

	List<Favorite> findByUserIdOrderByFavoriteDateDesc(String userId);

}
