package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;

import java.util.List;
import java.util.Map;

public interface FavoritesService {

	void deleteFavorites(FavoritesId favoritesId) throws Exception;

	void insertFavorites(Favorites favorites);
	
	boolean insertSuccess(Favorites entity);
	boolean deleteSuccess(FavoritesId entityid);

	int countFavorites(long productId);

	PageResultDTO<FavoritesDTO,Favorites> pageNationFavorites(String userId, PageRequestDTO pageRequestDTO);

	List<FavoritesDTO> userFavorites(String userId);

	int countFavorites(String userId);

	Favorites productFavorites(FavoritesId favoritesId);

	 Map<String, Object> getLikedState(ProductsDTO dto , String id);
}
