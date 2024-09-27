package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.repository.myPage.FavoritesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FavoritesService")
@RequiredArgsConstructor
public class FavoritesServiceImpl implements FavoritesService {

	final FavoritesRepository favoriteRepository;

	// ** 상품페이지, 마이페이지 모두에서 사용 ==================================

	// 1) 찜목록에서 row가 삭제될때 사용
	@Override
	public void deleteFavorite(FavoritesId favoriteId) throws Exception {
		if (!favoriteRepository.existsById(favoriteId)) {
			throw new Exception("favoritesId에 맞는 항목 없음");
		}
		favoriteRepository.deleteById(favoriteId);
	}

	// ** 상품 페이지에서만 사용 ==============================================

	// 1) 찜목록이 추가될때 사용
	@Override
	public void insertFavorite(Favorites favorite) {
		favoriteRepository.save(favorite);
	}

	// 2) 찜 개수를 count할 때 사용
	@Override
	public int countFavorite(long productId) {
		return favoriteRepository.countByProductId(productId);
	}

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 찜목록 표시할떄 사용
	@Override
	public List<Favorites> userFavorite(String userId) {
		return favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId);
	}

	// 2) 찜목록 전체 개수 표시
	@Override
	public int countFavorite(String userId){
		return favoriteRepository.countByUserId(userId);
	}
}
