
package com.example.mokkoji_backend.entity.myPage;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistoryListId implements Serializable {

	private static final long serialVersionUID = 1L;
	private int productId;
	private int purchaseNumber;
	private String optionContent;
	private String packagingOptionContent;
}
