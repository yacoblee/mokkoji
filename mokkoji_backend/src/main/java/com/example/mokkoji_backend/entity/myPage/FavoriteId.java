package com.example.mokkoji_backend.entity.myPage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteId implements Serializable {
	private static final long serialVersionUID = 1L;

	private String userId;
	private int productId;

}
