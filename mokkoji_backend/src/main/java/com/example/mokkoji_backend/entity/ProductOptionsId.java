package com.example.mokkoji_backend.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductOptionsId implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long productId;
	private String content;
}
