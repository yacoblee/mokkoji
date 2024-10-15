package com.example.mokkoji_backend.domain.productStatistics;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SumOptionsDTO {
	private String optionContent;
	private String packagingContent;
	private Integer  optionPrice;
	private Integer  packagingPrice;
	private Integer  sumProductCnt;
}
