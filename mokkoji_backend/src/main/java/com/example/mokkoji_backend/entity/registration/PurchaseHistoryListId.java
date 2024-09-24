package com.example.mokkoji_backend.entity.registration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryListId implements Serializable {
	private static final long serialVersionUID = 1L;

	private int purchaseNumber;
	private int productId;
	private String optionContent;
	private String packagingOptionContent;

}