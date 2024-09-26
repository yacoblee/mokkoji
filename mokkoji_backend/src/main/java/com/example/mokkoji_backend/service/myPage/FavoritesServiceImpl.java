package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.repository.myPage.FavoritesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritesServiceImpl implements FavoritesService {

	FavoritesRepository favoriteRepository;

	// ** 상품페이지, 마이페이지 모두에서 사용 ==================================

	// 1) 찜목록에서 row가 삭제될때 사용
	@Override
	public void deleteFavorite(FavoritesId favoriteId) {
		if (favoriteRepository.existsById(favoriteId)) {
			favoriteRepository.deleteById(favoriteId);
		}
	}

	// ** 상품 페이지에서만 사용 ==============================================

	// 1) 찜목록이 추가될때 사용
	@Override
	public void insertFavorite(Favorites favorite) {
		favoriteRepository.save(favorite);
	}

	// 2) 찜 개수를 count할 때 사용
	@Override
	public int countFavorite(int productId) {
		return favoriteRepository.countByProductId(productId);
	}

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 찜목록 표시할떄 사용
	@Override
	public List<Favorites> userFavorite(String userId) {
		return favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId);
	}

}
