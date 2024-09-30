package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoritesDTO {

	private String userId;
	private long productId;
	private LocalDateTime favoriteDate;
	private String categoryId;
	private String mainImageName;

}
