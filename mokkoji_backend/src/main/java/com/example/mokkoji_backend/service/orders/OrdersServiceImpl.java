package com.example.mokkoji_backend.service.orders;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.OrderRequestDTO;
import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.domain.productStatistics.TotalPurchaseDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.repository.orders.OrdersDSLRepository;
import com.example.mokkoji_backend.repository.orders.OrdersRepository;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.myPage.CartService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("OrdersService")
@AllArgsConstructor
public class OrdersServiceImpl implements OrdersService {

	ProductsService productService;
	OrdersRepository ordersRepository;
	AddressService addressService;
	CartService cartService;
	OrdersDetailService orderDetailSerivce;
	OrdersDSLRepository ordersDSLRepository;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 구매내역 조회
	@Override
	public List<OrdersDTO> listAllOrders(String userId) {
		return ordersDSLRepository.findAllByUserId(userId);
	}

	// ** 상품 페이지 사용 ==================================================
	@Override
	public Orders insertOrders(Orders entity) {
		Orders savedOrder = ordersRepository.save(entity);
		System.out.println("insertOrders_ Purchase Number: " + savedOrder.getPurchaseNumber());
		return savedOrder;
	}

	@Transactional
	@Override
	public void buyList(OrderRequestDTO request) {
		List<Address> addr = request.getAddressList();
		Orders order = request.getOrder();
		List<CartDTO> cart = request.getCartList();
		Address purchaseAddress = request.getPurchaseAddress();
		System.out.println("purchaseAddress" + purchaseAddress);
		for (Address add : addr) {
			System.out.println("addr =>" + add);
		}

		System.out.println("order" + order);
		for (CartDTO cartDTO : cart) {
			System.out.println("cartDTO =>" + cartDTO);
		}

		if (addr != null) { // addr 리스트가 null인지 확인. null이 아니면 주소 처리를 진행
			if (addr.size() > 3) { // addr 리스트의 크기가 3보다 큰지 확인. 이 경우에만 특정 주소 삭제 및 처리
				Address add = addr.get(2); // 리스트의 세 번째(인덱스 2) 주소 객체를 가져옴
				add = addressService.findUserAddressDetail(add.getUserId(), 2); // 이 주소의 상세 정보를 가져옴
				System.out.println("*********삭제될 아이디");
				System.out.println(add); // 삭제될 주소 정보를 출력
				addressService.deleteById(add.getAddressId()); // 주소를 데이터베이스에서 삭제
				addr.remove(2); // addr 리스트에서 세 번째 주소를 삭제
				System.out.println("두개 이상.");
				System.out.println("*********새로 저장될 주소");

				Address newaddress = addr.get(2); // 삭제 후 새로운 세 번째 주소 객체를 가져옴
				newaddress.setIsDefault(2); // 해당 주소의 기본 설정을 2로 변경
				// newaddress.setAddressId(null); // 주석 처리: 주소 ID를 null로 설정하는 코드는 실제 사용되지 않음
				// addr.add(2, newaddress); // 주석 처리: 주소를 다시 리스트에 추가하는 부분이지만 필요없음

				for (Address save : addr) { // addr 리스트의 모든 주소를 출력
					System.out.println(save);
				}
			}

			for (Address add : addr) { // addr 리스트의 모든 주소를 등록
				addressService.register(add);
			}

			List<Address> newaddr = addressService.findByuserId(order.getUserId()); // 해당 사용자의 새로운 주소 리스트를 데이터베이스에서 가져옴
			System.out.println("*********new addr");
			if (newaddr != null) { // newaddr 리스트가 null이 아닌지 확인하고
				for (Address address : newaddr) { // 새로운 주소 리스트를 출력
					System.out.println(address);
				}
			}
		}

		if (cart != null) {
			cartService.removeIfExists(cart);

			for (CartDTO dto : cart) {
				Long productId = dto.getProductId();
				int count = dto.getProductCnt();

				boolean success = productService.updateStockCont(productId, count, "-");

				if (!success) {
					throw new RuntimeException("상품 ID: " + productId + "의 재고가 부족합니다. 주문을 처리할 수 없습니다.");
				}
			}
		}
		if (purchaseAddress != null) {

			try {
				purchaseAddress = addressService.findByUserIdAndLocationName(purchaseAddress.getUserId(),
						purchaseAddress.getLocationName());
				System.out.println("************************");
				// System.out.println(purchaseAddress);
				// order.setAddressId(purchaseAddress.getAddressId());
				System.out.println(purchaseAddress);
				order.setStreetAddress(purchaseAddress.getStreetAddress());
				order = insertOrders(order);
				System.out.println("buyList_  Purchase Number: " + order.getPurchaseNumber());
				orderDetailSerivce.insertDtoList(cart, order.getPurchaseNumber());

			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}

	}

}
