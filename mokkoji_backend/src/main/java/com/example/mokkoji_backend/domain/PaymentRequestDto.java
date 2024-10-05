package com.example.mokkoji_backend.domain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PaymentRequestDto {

    private Long orderId; // 주문 ID
    private String userId; // 회원 ID
    private Long price; // 결제 금액
    private String merchantUid; 
    
    private String registCode; //예약상품 코드
    private int teenager; //청소
    private int adult;	//성인
    private int personCnt; // 총인원
    private BigDecimal registCnt; // 결제금
    private String activeDate; //예약날짜

}
