package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.repository.myPage.FavoritesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("FavoritesService")
@RequiredArgsConstructor
public class FavoritesServiceImpl implements FavoritesService {

	final FavoritesRepository favoriteRepository;
	final ProductsRepository productsRepository;

	// ** 상품페이지, 마이페이지 모두에서 사용 ==================================

	// 1) 찜목록에서 row가 삭제될때 사용
	@Override
	public void deleteFavorites(FavoritesId favoritesId) throws Exception {
		if (!favoriteRepository.existsById(favoritesId)) {
			throw new Exception("favoritesId에 맞는 항목 없음");
		}
		favoriteRepository.deleteById(favoritesId);
	}

	// ** 상품 페이지에서만 사용 ==============================================
	
	// 1) 찜 여부 확인할 때 사용(하트표시)
	@Override
	public Favorites productFavorites(FavoritesId favoritesId) {
		return favoriteRepository.findById(favoritesId).get();
	}

	// 2) 찜 개수를 count할 때 사용
	@Override
	public int countFavorites(long productId) {
		return favoriteRepository.countByProductId(productId);
	}

	// 3) 찜목록이 추가될때 사용
	@Override
	public void insertFavorites(Favorites favorites) {
		favoriteRepository.save(favorites);
	}

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 찜목록 표시할떄 사용
	@Override
	public List<FavoritesDTO> userFavorites(String userId) {
		List<Favorites> favoritesList = favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId);

		List<FavoritesDTO> favoritesDTOList = favoritesList.stream().map(item -> {
			// Optional<Products>로 상품을 가져오기
			Optional<Products> products = productsRepository.findById(item.getProductId());
			FavoritesDTO favoritesDTO = new FavoritesDTO();

			favoritesDTO.setUserId(item.getUserId());
			favoritesDTO.setProductId(item.getProductId());
			favoritesDTO.setFavoriteDate(item.getFavoriteDate());

			// Optional<Products>의 값이 존재하는 경우에만 설정
			if (products.isPresent()) {
				Products product = products.get();
				favoritesDTO.setProductName(product.getName());
				favoritesDTO.setCategoryId(product.getCategoryId());
				favoritesDTO.setMainImageName(product.getMainImageName());
			} else {
				// 기본값 설정 또는 로깅 등 처리
				favoritesDTO.setProductName(null);
				favoritesDTO.setCategoryId(null);
				favoritesDTO.setMainImageName(null);
			}

			return favoritesDTO;
		}).collect(Collectors.toList());

		return favoritesDTOList;
	}

	// 2) 찜목록 전체 개수 표시
	@Override
	public int countFavorites(String userId){
		return favoriteRepository.countByUserId(userId);
	}
}
