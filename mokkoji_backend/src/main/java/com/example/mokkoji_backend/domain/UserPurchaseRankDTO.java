package com.example.mokkoji_backend.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder 
public class UserPurchaseRankDTO {
	public String userId;
    private double totalPurchase; //해당 유저의 총 구매 금액을 나타냅니다.
    private int purchaseRank; //구매 금액을 기준으로 해당 유저의 순위를 나타냅니다.
    private double percentageRank; //해당 유저가 전체 유저 중에서 상위 몇 %에 위치
}
