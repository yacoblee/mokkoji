package com.example.mokkoji_backend.entity.orders;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrdersId implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private int purchaseNumber;
	private String userId;
	private int addressId;

}
