
package com.example.mokkoji_backend.entity.goods;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImagesId implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long productId;
	private int order;
	private String type;
}
