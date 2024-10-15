package com.example.mokkoji_backend.domain.productStatistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TotalPurchaseDTO {
	

	 private String yearmonth;
	 private int totalPrice;


	
}
