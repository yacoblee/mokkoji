package com.example.mokkoji_backend.entity.myPage;

import java.io.Serial;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteId implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private String userId;
	private int productId;

}
