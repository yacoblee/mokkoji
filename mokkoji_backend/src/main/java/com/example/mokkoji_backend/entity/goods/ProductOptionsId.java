package com.example.mokkoji_backend.entity.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionsId implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long productId;
	private String content;
}
