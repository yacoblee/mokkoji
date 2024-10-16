package com.example.mokkoji_backend.service.myPage;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.ProductBuyDTO;
import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import com.example.mokkoji_backend.repository.myPage.CartDSLRepository;
import com.example.mokkoji_backend.repository.myPage.CartRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("CartService")
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	final CartRepository cartRepository;
	final ProductsRepository productsRepository;
	final ProductoptionsService productoptionsService;
	final PackagingService packagingService;
	final CartDSLRepository cartDSLRepository;

	// ** 상품페이지에서만 사용 ===============================================
	// 0) cart entity를 각각의 서비스로 찾아 dto를 반환하는 메서드
	// 실제로 있는 데이터와 비교하여 반환하는 경우이기 때문에 , 없는 데이터를 기반으로 변환할 경우 nosuch 에러 반환.
	@Override
	public CartDTO entityToDto (Cart cart) {
		//1. 복합키 찾기
		ProductOptionsId optionPk = ProductOptionsId.builder()
				.productId(cart.getProductId())
				.content(cart.getOptionContent())
				.build();
		//2.각 엔터티 값 찾기
		Products productEntity = productsRepository.findById(cart.getProductId()).get();
		ProductOptions productOptionEntity = productoptionsService.findById(optionPk).get();
		Packaging packagingEntity = packagingService.findById(cart.getPackagingOptionContent());
		
		return CartDTO.builder().userId(cart.getUserId())
				.productId(cart.getProductId())
				.optionContent(cart.getOptionContent())
				.packagingOptionContent(cart.getPackagingOptionContent())
				.productCnt(cart.getProductCnt())
				.productTotalPrice(cart.getProductTotalPrice())
				.productName(productEntity.getName())
				.categoryId(productEntity.getCategoryId())
				.mainImageName(productEntity.getMainImageName())
				.price(productEntity.getPrice())
				.optionPrice(productOptionEntity.getPrice())
				.packagingOptionPrice(packagingEntity.getPackagingPrice())
				.build();
	}
	//cartDTO 에서 id 추출 메서드
	public CartId createCartId(CartDTO dto) {
	    return CartId.builder()
                .userId(dto.getUserId())
                .productId(dto.getProductId())
                .optionContent(dto.getOptionContent())
                .packagingOptionContent(dto.getPackagingOptionContent())
                .build();
	}
	//cart 에서 id 추출 메서드
	public CartId createCartId(Cart entity) {
	    return CartId.builder()
                .userId(entity.getUserId())
                .productId(entity.getProductId())
                .optionContent(entity.getOptionContent())
                .packagingOptionContent(entity.getPackagingOptionContent())
                .build();
	}
	
	
	
	// 1) cart에 새로 row를 추가할 때 사용
	@Override
	public void insertCart(Cart cart) {
		
		cartRepository.save(cart);
	}
	
	// 2) cart에 있는 내용이라면 업데이트 .
	@Override
	public void duplicateUpate(Cart cart) {
		CartId id = createCartId(cart);
		Optional<Cart> selectCart = cartRepository.findById(id);
		if(selectCart.isPresent()) {//수량 , 금액 증가하고 update.
			//String userId, long productId, String optionContent, String packagingOptionContent,
			//int productCnt, int productTotalPrice
			Cart existingCart = selectCart.get();
			cartRepository.
					updateCart(cart.getUserId(), cart.getProductId(), 
							cart.getOptionContent(), cart.getPackagingOptionContent(),
							cart.getProductCnt()+existingCart.getProductCnt(), cart.getProductTotalPrice()+existingCart.getProductTotalPrice());
		}else {//insert
			 cartRepository.save(cart);
		}
	}
	// 3) cart find By Id .
	public Cart findById(CartId id) {
		Optional<Cart> cart = cartRepository.findById(id);
		if(cart.isPresent()) {
			return cart.get();
		}else return null;
	}
	
	// 4) cart에 있는지 확인해서 있다면 , dto 내용 추가해서 반환.
	//실제 cart와 대조해서 변환하는 것이 아니고 , 
	public CartDTO findentityAndNewReturnDto(Cart entity) {
		CartId cartId = createCartId(entity);
		Optional<Cart> findcart = cartRepository.findById(cartId);
		if(findcart.isPresent()) {//카트가 존재하면 ,
			CartDTO dto = entityToDto(findcart.get());

		
				int count = entity.getProductCnt()+dto.getProductCnt();
				dto.setProductCnt(count);
				int totalPrice = entity.getProductTotalPrice()+dto.getProductTotalPrice();
				dto.setProductTotalPrice(totalPrice);
				
				return dto;
				
			
		}else return entityToDto(entity);
	}
	// 4) cart에 있는지 확인해서 있다면 , 리스트 줄여서 반환.
	public List<CartDTO> findentityAndNewReturnList(CartDTO dto) {
		CartId cartId = createCartId(dto);
		List<Cart> list ;
		List<CartDTO> dtoList=new ArrayList<>();;
		System.out.println("*********************** dto.getID=>"+dto.getUserId());
		Optional<Cart> cart = cartRepository.findById(cartId);
		if(cart.isPresent()) {//카트가 존재하면 ,(String userId, long productId, String optionContent, String packagingOptionContent);
			 list = cartDSLRepository.findByExcludingSpecificCart
					 (dto.getUserId(),dto.getProductId(),dto.getOptionContent(),dto.getPackagingOptionContent());
			 System.out.println("카트에 있는 상품이네");
			 for (Cart c : list) {
				 System.out.println("장바구니에 새로이 들어갈 목록들");
				System.out.println(c);
			}
		}else  {
			list = cartRepository.findByUserIdOrderByCartDateDesc(dto.getUserId());
		}
		
		for (Cart entity : list) {

			CartDTO makedto = entityToDto(entity);
			dtoList.add(makedto);
		}
		return dtoList;
	}
	
	//5 ) 구매시 카트 dto 리스트에서 카트가 있으면 delete 
	public void removeIfExists(List<CartDTO> list) {
		for (CartDTO dto : list) {
			CartId cartId = createCartId(dto);
			if(findById(cartId)!=null) {
				System.out.println("removeIfExists _장바구니에 있어요");
				System.out.println(dto);
				deleteCart(cartId);
			}
		}
	}
	
	// ** 마이페이지에서만 사용 ==============================================================

	// 1) 사용자별 cart 목록 확인시 사용
	@Override
	public List<CartDTO> userCart(String userId) {
		return cartDSLRepository.findUserCartById(userId);
	}

	// 2) cart의 총 개수 조회
	@Override
	public int countCart(String userId){
		return cartRepository.countByUserId(userId);
	}

	// 3) cart의 각 상품의 개수를 조정할 때 사용
	@Override
	@Transactional
	public List<CartDTO> updateCart(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt) {
		cartDSLRepository.changeProductCnt(userId, productId, optionContent, packagingOptionContent, productCnt);
		return cartDSLRepository.findUserCartById(userId);
	}

	// 4) cart의 상품을 삭제할 때 사용
	@Override
	public void deleteCart(CartId cartId) {
		cartRepository.deleteById(cartId);
	}

}
