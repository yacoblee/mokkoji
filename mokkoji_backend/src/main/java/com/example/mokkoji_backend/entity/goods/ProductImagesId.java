<<<<<<<< HEAD:mokkoji_backend/src/main/java/com/example/mokkoji_backend/entity/myPage/PurchaseHistoryListId.java
package com.example.mokkoji_backend.entity.myPage;
========
package com.example.mokkoji_backend.entity.goods;

import java.io.Serializable;
>>>>>>>> hyemi:mokkoji_backend/src/main/java/com/example/mokkoji_backend/entity/goods/ProductImagesId.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
<<<<<<<< HEAD:mokkoji_backend/src/main/java/com/example/mokkoji_backend/entity/myPage/PurchaseHistoryListId.java
public class PurchaseHistoryListId implements Serializable {

	static final long serialVersionUID = 1L;

	private int purchaseNumber;
========
@AllArgsConstructor
public class ProductImagesId implements Serializable{
	private static final long serialVersionUID = 1L;
	
>>>>>>>> hyemi:mokkoji_backend/src/main/java/com/example/mokkoji_backend/entity/goods/ProductImagesId.java
	private int productId;
	private int order;
	private String type;
}
