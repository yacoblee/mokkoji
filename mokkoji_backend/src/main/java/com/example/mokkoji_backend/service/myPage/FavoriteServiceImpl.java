package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.entity.myPage.Favorite;
import com.example.mokkoji_backend.entity.myPage.FavoriteId;
import com.example.mokkoji_backend.repository.myPage.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl {

	FavoriteRepository favoriteRepository;

	// ** 상품페이지, 마이페이지 모두에서 사용 ==================================

	// 1) 찜목록에서 row가 삭제될때 사용
	void deleteFavorite(FavoriteId favoriteId) {
		favoriteRepository.deleteById(favoriteId);
	}

	// ** 상품 페이지에서만 사용 ==============================================

	// 1) 찜목록이 추가될때 사용
	void insertFavorite(Favorite favorite) {
		favoriteRepository.save(favorite);
	}

	// 2) 찜 개수를 count할 때 사용
	int countFavorite(int productId){
		return favoriteRepository.countByProductId(productId);
	}
	
	// ** 마이페이지에서만 사용 ===============================================

	// 1) 찜목록 표시할떄 사용
	List<Favorite> userFavorite(String userId) {
		return favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId);
	}

}
