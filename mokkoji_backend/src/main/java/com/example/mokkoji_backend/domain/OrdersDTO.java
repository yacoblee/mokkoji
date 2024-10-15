package com.example.mokkoji_backend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrdersDTO {
	private int purchaseNumber;
	private String userId;
	private int addressId;

	private String streetAddress;

	private int total;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate regDate;

	private long id;

	private String name;

	private String optionContent;
	private String packagingOptionContent;
	private int productCnt;
	private int productTotalPrice;

	private String mainImageName;
}
