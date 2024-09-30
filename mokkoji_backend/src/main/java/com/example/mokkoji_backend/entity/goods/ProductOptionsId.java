package com.example.mokkoji_backend.entity.goods;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionsId implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long productId;
	private String content;
}
