package com.example.mokkoji_backend.entity.purchase;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "purchasehistorylist")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(PurchaseHistoryListId.class)
public class PurchaseHistoryList implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "purchase_number")
	private int purchaseNumber;
	@Id
	@Column(name = "product_id")
	private int productId;
	@Id
	@Column(name = "option_content")
	private String optionContent;
	@Id
	@Column(name = "packaging_option_content")
	private String packagingOptionContent;

	@Column(name = "product_cnt")
	private int productCnt;
	@Column(name = "product_total_price")
	private int productTotalPrice;

}
