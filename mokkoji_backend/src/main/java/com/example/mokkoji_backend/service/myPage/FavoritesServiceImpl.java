package com.example.mokkoji_backend.service.myPage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.FavoritesDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Favorites;
import com.example.mokkoji_backend.entity.myPage.FavoritesId;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.repository.myPage.FavoritesRepository;
import com.example.mokkoji_backend.service.goods.ProductsService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service("FavoritesService")
@RequiredArgsConstructor
@Log4j2
public class FavoritesServiceImpl implements FavoritesService {

	final FavoritesRepository favoriteRepository;
	final ProductsRepository productsRepository;
	final ProductsService productService;

	// ** 상품페이지, 마이페이지 모두에서 사용 ==================================

	// 1) 찜목록에서 row가 삭제될때 사용
	@Override
	public void deleteFavorites(FavoritesId favoritesId) throws Exception {
		if (!favoriteRepository.existsById(favoritesId)) {
			throw new Exception("favoritesId에 맞는 항목 없음");
		}
		favoriteRepository.deleteById(favoritesId);
	}

	// ** 상품 페이지에서만 사용 =========================================================================
	
	// 1-1) 찜 여부 확인할 때 사용(하트표시)
	@Override
	public Favorites productFavorites(FavoritesId favoritesId) {
		return favoriteRepository.findById(favoritesId).get();
	}

	// 1-2 ) 찜 여부 확인할 때 사용(하트표시)
	@Override
	public Map<String, Object> getLikedState(ProductsDTO dto , String id){
		Map<String, Object> response = new HashMap<>();

		FavoritesId fid = FavoritesId.builder().userId(id).productId(dto.getId()).build();
		
        try {
            Favorites liked = productFavorites(fid);
            response.put("liked", true);
            log.info("[getLikedState] 해당 제품은 찜한 상품.");
        } catch (Exception e) {
            log.info("[getLikedState] 해당 제품은 찜하지 않은 상품.");
            response.put("liked", false);
        }
        response.put("userId", id);
        return response;
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
	// 3) 찜목록이 추가될때 사용
	@Override
	@Transactional
	public boolean insertSuccess(Favorites entity) {
		try {
			insertFavorites(entity);
			
			boolean productLikeCount = productService.updateLikeCount(entity.getProductId(), "+");
	        if (!productLikeCount) {
	            throw new RuntimeException("좋아요 카운트 업데이트 실패");
	        }
			log.info("[insertSuccess] 찜 상태 추가 완료");
			return true;
		} catch (Exception e) {
			log.info("[insertSuccess] 찜 상태 추가 에러 발생 파악 바람");
			return false;
		}
	}
	
	// 3) 찜목록이 삭제될때 사용
	@Override
	@Transactional
	public boolean deleteSuccess(FavoritesId entityid) {
		try {
			deleteFavorites(entityid);
			boolean productLikeCount = productService.updateLikeCount(entityid.getProductId(), "-");
	        if (!productLikeCount) {
	            throw new RuntimeException("좋아요 카운트 업데이트 실패");
	        }
			log.info("[deleteSuccess] 찜 삭제 완료");
			return false;
		} catch (Exception e) {
			log.info("[deleteSuccess] 찜 삭제 실패 에러 발생 파악 바람");
			return true;
		}
	}


	// ** 마이페이지에서만 사용 ==========================================================================

	// page용 임시 메서드
	private FavoritesDTO entityToDTOFavorites(Favorites favorites) {
		Products products = productsRepository.findById(favorites.getProductId()).get();

		return FavoritesDTO.builder()
				.userId(favorites.getUserId())
				.productId(favorites.getProductId())
				.favoriteDate(favorites.getFavoriteDate())
				.productName(products.getName())
				.categoryId(products.getCategoryId())
				.mainImageName(products.getMainImageName())
				.build();
	}

	@Override
	public PageResultDTO<FavoritesDTO,Favorites> pageNationFavorites(String userId, PageRequestDTO pageRequestDTO) {
		Page<Favorites> favoritesPage = favoriteRepository.findByUserIdOrderByFavoriteDateDesc(userId, pageRequestDTO.getPageable());

		return new PageResultDTO<>(favoritesPage, this::entityToDTOFavorites);
	}

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
