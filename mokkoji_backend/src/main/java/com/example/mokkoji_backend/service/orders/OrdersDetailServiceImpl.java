package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.entity.orders.OrdersDetail;
import com.example.mokkoji_backend.repository.orders.OrdersDetailRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service("OrdersDetailService")
@AllArgsConstructor
public class OrdersDetailServiceImpl implements OrdersDetailService {

	OrdersDetailRepository ordersDetailRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 주문번호에 해당하는 구매내역 개별 조회
	@Override
	public List<OrdersDetail> ordersDetail(int purchaseNumber) {
		return ordersDetailRepository.findByPurchaseNumberOrderByProductId(purchaseNumber);
	}

	// ** 구매페이지에서  사용 ===============================================
	public OrdersDetail dtoToEntity(CartDTO dto, int purchaseNumber) {
		return OrdersDetail.builder().purchaseNumber(purchaseNumber)
				.productId(dto.getProductId())
				.optionContent(dto.getOptionContent())
				.packagingOptionContent(dto.getPackagingOptionContent())
				.productCnt(dto.getProductCnt())
				.productTotalPrice(dto.getProductTotalPrice())
				.build();
	}
	
	
	@Override
	public void insertDtoList(List<CartDTO> list, int purchaseNumber) {
		for (CartDTO dto : list) {
			OrdersDetail entity = dtoToEntity(dto, purchaseNumber);
			ordersDetailRepository.save(entity);
		}
		
	}
}
