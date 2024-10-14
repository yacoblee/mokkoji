package com.example.mokkoji_backend.domain.productStatistics;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegDatePurchaseDTO {
	private LocalDate regDate;
	private Long purchaseCount;
}
