package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;

import java.util.List;

public interface FavoritesService {

	void deleteFavorite(FavoritesId favoriteId) throws Exception;

	void insertFavorite(Favorites favorite);

	int countFavorite(int productId);

	List<Favorites> userFavorite(String userId);

}
