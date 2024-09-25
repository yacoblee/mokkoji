package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorite;
import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import com.example.mokkoji_backend.repository.myPage.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl {

	FavoriteRepository favoriteRepository;

	// 마이페이지에서 찜목록 표시할떄 사용
	List<Favorite> userFavorite(String userId) {
		return favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId);
	}

	// 찜목록이 추가될때 사용
	void addFavorite(Favorite favorite) {
		favoriteRepository.save(favorite);
	}

	// 마이페이지에서 찜목록을 삭제후 다시 List를 불러올때 사용
	void deleteFavorite(FavoriteId favoriteId) {
		favoriteRepository.deleteById(favoriteId);
	}

}
