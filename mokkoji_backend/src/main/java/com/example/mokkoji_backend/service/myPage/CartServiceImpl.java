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
import com.example.mokkoji_backend.repository.myPage.CartRepository;
import com.example.mokkoji_backend.service.goods.PackagingService;
import com.example.mokkoji_backend.service.goods.ProductoptionsService;
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

	// ** 상품페이지에서만 사용 ===============================================
	
	// 1) cart에 새로 row를 추가할 때 사용
	@Override
	public void insertCart(Cart cart) {
		
		cartRepository.save(cart);
	}
	
	// 2) cart에 있는 내용이라면 업데이트 .
	@Override
	public void duplicateUpate(Cart cart) {
		CartId id = CartId.builder()
				.userId(cart.getUserId())
				.productId(cart.getProductId())
				.optionContent(cart.getOptionContent())
				.packagingOptionContent(cart.getPackagingOptionContent())
				.build();
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
	public ProductBuyDTO findentityAndNewReturnDto(ProductBuyDTO dto) {
		CartId cartId = CartId.builder().userId(dto.getUserId())
				.productId(dto.getProductId())
				.optionContent(dto.getOptionContent())
				.packagingOptionContent(dto.getPackagingContent())
				.build();
		Optional<Cart> cart = cartRepository.findById(cartId);
		if(cart.isPresent()) {//카트가 존재하면 ,
			Cart entity = cart.get();
//			ProductOptionsId optionId = ProductOptionsId.builder()
//					.productId(dto.getProductId())
//					.content(dto.getOptionContent()).build();
			try {
				int count = entity.getProductCnt()+dto.getProductCnt();
				dto.setProductCnt(count);
				int totalPrice = entity.getProductTotalPrice()+dto.getProductTotalPrice();
				dto.setProductTotalPrice(totalPrice);
				return dto;
				
			} catch (Exception e) {
				return dto;
			}
		}else return dto;
	}
	// 4) cart에 있는지 확인해서 있다면 , 리스트 줄여서 반환.
	public List<ProductBuyDTO> findentityAndNewReturnList(ProductBuyDTO dto) {
		CartId cartId = CartId.builder().userId(dto.getUserId())
				.productId(dto.getProductId())
				.optionContent(dto.getOptionContent())
				.packagingOptionContent(dto.getPackagingContent())
				.build();
		List<Cart> list ;
		List<ProductBuyDTO> dtoList=new ArrayList<>();;
		Optional<Cart> cart = cartRepository.findById(cartId);
		if(cart.isPresent()) {//카트가 존재하면 ,(String userId, long productId, String optionContent, String packagingOptionContent);
			 list = cartRepository.findByUserIdAndProductIdAndOptionContentAndPackagingOptionContentNot
					 (dto.getUserId(),dto.getProductId(),dto.getOptionContent(),dto.getPackagingContent());
		}else  list = cartRepository.findAll();
		
		for (Cart entity : list) {
			ProductOptionsId productOptionsId = ProductOptionsId.builder()
					.productId(entity.getProductId())
					.content(entity.getOptionContent()).build();
			ProductOptions productOptions = productoptionsService.findById(productOptionsId);
			Packaging packaging = packagingService.findById(entity.getPackagingOptionContent());
			Products product = productsRepository.findById(entity.getProductId()).get();
			
			ProductBuyDTO makedto = ProductBuyDTO.builder()
					.userId(entity.getUserId())
					.productId(entity.getProductId())
					.categoryId(product.getCategoryId())
					.productName(product.getName())
					.mainImageName(product.getMainImageName())
					.productPrice(product.getPrice())
					.optionContent(productOptions.getContent())
					.optionPrice(productOptions.getPrice())
					.packagingContent(packaging.getPackagingContent())
					.packagingPrice(packaging.getPackagingPrice())
					.productCnt(entity.getProductCnt())
					.productTotalPrice(entity.getProductTotalPrice())
					.build();
			dtoList.add(makedto);
		}
		return dtoList;
	}
	
	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 cart 목록 확인시 사용
	@Override
	public List<CartDTO> userCart(String userId) {
		List<Cart> cartList = cartRepository.findByUserIdOrderByCartDateDesc(userId);

		List<CartDTO> cartDTOList = cartList.stream().map(item -> {
			// Optional<Products>로 상품을 가져오기
			Optional<Products> products = productsRepository.findById(item.getProductId());
			CartDTO cartDTO = new CartDTO ();

			// Cart에서 직접 가져옴
			cartDTO.setUserId(item.getUserId());
			cartDTO.setProductId(item.getProductId());
			cartDTO.setOptionContent(item.getOptionContent());
			cartDTO.setPackagingOptionContent(item.getPackagingOptionContent());
			cartDTO.setProductCnt(item.getProductCnt());
			cartDTO.setCartDate(item.getCartDate());

			// ProductOptions에서 price 끌고오기
			ProductOptionsId productOptionsId = ProductOptionsId.builder()
					.productId(item.getProductId())
					.content(item.getOptionContent()).build();
			ProductOptions productOptions = productoptionsService.findById(productOptionsId);
			cartDTO.setOptionPrice(productOptions.getPrice());

			// ProductOptions에서 price 끌고오기
			Packaging packaging = packagingService.findById(item.getPackagingOptionContent());
			cartDTO.setPackagingOptionPrice(packaging.getPackagingPrice());

			// Optional<Products>의 값이 존재하는 경우에만 설정
			if (products.isPresent()) {
				Products product = products.get();
				cartDTO.setProductName(product.getName());
				cartDTO.setPrice(product.getPrice());
				cartDTO.setCategoryId(product.getCategoryId());
				cartDTO.setMainImageName(product.getMainImageName());
			} else {
				// 기본값 설정 또는 로깅 등 처리
				cartDTO.setProductName(null);
				cartDTO.setPrice(0);
				cartDTO.setCategoryId(null);
				cartDTO.setMainImageName(null);
			}

			int productPrice = cartDTO.getPrice() + cartDTO.getOptionPrice() + cartDTO.getPackagingOptionPrice();

			cartDTO.setProductTotalPrice(productPrice * cartDTO.getProductCnt());

			return cartDTO;
		}).collect(Collectors.toList());

		return cartDTOList;
	}

	// 2) cart의 총 개수 조회
	@Override
	public int countCart(String userId){
		return cartRepository.countByUserId(userId);
	}

	// 3) cart의 각 상품의 개수를 조정할 때 사용
	@Override
	public void updateCart(String userId, long productId, String optionContent, String packagingOptionContent, int productCnt, int productTotalCount) {
		cartRepository.updateCart(userId, productId, optionContent, packagingOptionContent, productCnt, productTotalCount);
	}

	// 4) cart의 상품을 삭제할 때 사용
	@Override
	public void deleteCart(CartId cartId) {
		cartRepository.deleteById(cartId);
	}

}
