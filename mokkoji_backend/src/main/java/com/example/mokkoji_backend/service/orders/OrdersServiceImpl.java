package com.example.mokkoji_backend.service.orders;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.OrderRequestDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.repository.orders.OrdersRepository;
import com.example.mokkoji_backend.service.goods.ProductsService;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.myPage.CartService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service("OrdersService")
@AllArgsConstructor
public class OrdersServiceImpl implements OrdersService {

	ProductsService productService;
	OrdersRepository ordersRepository;
	AddressService addressService;
	CartService cartService;
	OrdersDetailService orderDetailSerivce;

	// ** 마이페이지에서만 사용 ===============================================

	// 1) 사용자별 구매내역 조회
	@Override
	public List<Orders> userOrders(String userId) {
		return ordersRepository.findByUserIdOrderByRegDateDesc(userId);
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

		if (addr != null) {
			if (addr.size() > 3) {
				Address add = addr.get(2);
				addressService.deleteById(add.getAddressId());
				addr.remove(2);
				System.out.println("두개 이상.");
			}
			for (Address add : addr) {
				addressService.register(add);

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
				System.out.println(purchaseAddress);
				order.setAddressId(purchaseAddress.getAddressId());
				order = insertOrders(order);
				System.out.println("buyList_  Purchase Number: " + order.getPurchaseNumber());
				orderDetailSerivce.insertDtoList(cart, order.getPurchaseNumber());

			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}

	}
}
