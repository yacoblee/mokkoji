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
		System.out.println("purchaseAddress"+purchaseAddress);
		for (Address add : addr) {
			System.out.println("addr =>"+add);
		}
		
		System.out.println("order"+order);
		for (CartDTO cartDTO : cart) {
			System.out.println("cartDTO =>"+cartDTO);
		}
		if (addr != null) {
			if (addr.size() > 3) {
				Address add = addr.get(2);
				add = addressService.findUserAddressDetail(add.getUserId(), 2);
				System.out.println("*********삭제될 아이디");
				System.out.println(add);
				addressService.deleteById(add.getAddressId());
				addr.remove(2);
				System.out.println("두개 이상.");
				System.out.println("*********새로 저장될 주소");
				Address newaddress = addr.get(2);
				newaddress.setIsDefault(2);
				//newaddress.setAddressId(null);
				//addr.add(2, newaddress);
				for (Address save : addr) {
					System.out.println(save);
				}
			}
			for (Address add : addr) {
				addressService.register(add);
			}
			List<Address> newaddr = addressService.findByuserId(order.getUserId());
			System.out.println("*********new addr");
			if(newaddr!=null) {
				for (Address address : newaddr) {
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
				//System.out.println(purchaseAddress);
				//order.setAddressId(purchaseAddress.getAddressId());
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
