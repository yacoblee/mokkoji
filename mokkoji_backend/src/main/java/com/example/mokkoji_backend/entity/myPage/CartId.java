package com.example.mokkoji_backend.entity.myPage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartId implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private String userId;
	private long productId;
	private String optionContent;
	private String packagingOptionContent;

}
