package com.example.mokkoji_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.mokkoji_backend.domain.OrdersDTO;
import com.example.mokkoji_backend.entity.orders.Orders;
import com.example.mokkoji_backend.jwtToken.TokenProvider;
import com.example.mokkoji_backend.service.orders.OrdersDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.mokkoji_backend.domain.CartDTO;
import com.example.mokkoji_backend.domain.OrderRequestDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.service.login.AddressService;
import com.example.mokkoji_backend.service.login.UsersService;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.orders.OrdersService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrdersController {

	private final CartService cartService;
	private final UsersService userService;
	private final AddressService addressService;
	private final OrdersService orderService;

	private final TokenProvider tokenProvider;

	public String getUserIdFromHeader(String header) {
		return tokenProvider.validateAndGetUserId(header.substring(7));
	}


	// ** 혜미 1 )구매 페이지로의 전환
	//단품 구매시 
	//cart에 있는지 확인해서 있다면 , dto 내용 추가해서 반환.
	@PostMapping("/page")
	public ResponseEntity<?> orderPage(@RequestBody Cart cart){
		Map<String, Object> response = new HashMap<>();
		
		
		//Packaging packagingEntity = packSerivce.findById(packagingId);
		if(cart!=null) {
			try {		
				System.out.println("*****Cart entity => "+cart);
	
				//CartDTO dto = cartService.entityToDto(cart);
				CartDTO dto = cartService.findentityAndNewReturnDto(cart);
				response.put("productBuy", dto);
				return ResponseEntity.ok(response);
			} catch (Exception e) {
	
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("서비스 단에서 찾지 못함");
			}

		}
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("찾지못함");
	}
	
	// ** 혜미 2 )장바구니 리스트 가져오기
	//단품 구매시 , 장바구니 목록과 일치하면 제외하여 반환하는 리스트.
	//cartDSLRepository 을 이용함.
	@PostMapping("/bringcart") 
	public ResponseEntity<?> bringCart(@RequestBody CartDTO dto){
		Map<String, Object> response = new HashMap<>();
		
		try {
			List<CartDTO> list = cartService.findentityAndNewReturnList(dto);
			response.put("cartList", list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("카트 서비스 오류");
		}
		
		return ResponseEntity.ok(response);
	}
	
	
	//** 혜미 3 )BuyInputBox 컴포넌트에서 구매시 필요 정보를 전송함.
	//유저 정보와 주소 정보를 전달.
	@PostMapping("/users")
	public ResponseEntity<?> userinfomation(@RequestBody UsersDTO entity){
		Users user = userService.selectOne(entity.getUserId());
		List<Address> addressList = addressService.findByuserId(entity.getUserId());
		if(user!=null && addressList !=null) {
			Map<String, Object> response = new HashMap<>();
			response.put("userinfomation", user);
			response.put("addressList",addressList);
			//System.out.println("*******addressList =>"+addressList);
			return ResponseEntity.ok(response);
		}else  return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("해당유저 찾지 못함");
	}
	
	//** 혜미 4 )구매시 이벤트를 , @Transactional으로 처리.
	@PostMapping("/buy")
	public ResponseEntity<?> buyNow(@RequestBody OrderRequestDTO request){
		
		
		 Map<String, Object> response = new HashMap<>();
		
		try {
			orderService.buyList(request);
		
			response.put("success", "success");
		
		return ResponseEntity.ok(response);
	} catch (Exception e) {
		
		response.put("failed", "error");
		return ResponseEntity.ok(response);
	}
		
	}

	// ** 마이페이지 사용 ==================================================================

	// 1. DTO 리스트 출력
	@GetMapping("/list")
	public ResponseEntity<?> ordersList(@RequestHeader("Authorization") String header) {
		String userId = getUserIdFromHeader(header);

		try {
			List<OrdersDTO> ordersList = orderService.listAllOrders(userId);

			return ResponseEntity.ok(ordersList);

		} catch (Exception e) {
			log.warn("내부 서버 오류 : ordersList");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("내부 서버 오류 : ordersList");
		}
	}

}
