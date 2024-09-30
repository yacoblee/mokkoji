package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;

import java.util.List;

public interface FavoritesService {

	void deleteFavorite(FavoritesId favoriteId) throws Exception;

	void insertFavorite(Favorites favorite);

	int countFavorite(long productId);

	List<FavoritesDTO> userFavorite(String userId);

	int countFavorite(String userId);

	Favorites productFavorite(FavoritesId favoritesId);

}
