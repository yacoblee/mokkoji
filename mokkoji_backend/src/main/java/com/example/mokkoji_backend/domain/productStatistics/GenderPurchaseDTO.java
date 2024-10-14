package com.example.mokkoji_backend.domain.productStatistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenderPurchaseDTO {
    private String gender;  // 성별
    private Long purchaseCount;  // 구매 횟수
}
