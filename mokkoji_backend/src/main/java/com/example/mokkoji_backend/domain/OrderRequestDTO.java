package com.example.mokkoji_backend.domain;

import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.orders.Orders;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderRequestDTO {
	private List<Address> addressList;
	private Orders order ;
	private List<CartDTO> cartList;
}
