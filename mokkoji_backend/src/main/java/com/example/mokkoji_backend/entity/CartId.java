package com.example.mokkoji_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartId implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userId;
	private int productId;
	private String optionContent;
	private String packagingOptionContent;

}
