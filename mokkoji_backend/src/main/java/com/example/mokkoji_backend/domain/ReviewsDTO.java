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
public class ReviewsDTO {
	private int reviewId;

	private String userId;
	private long productId;
	private String productName;

	private String reviewContent;
	private LocalDateTime reviewDate;
	private boolean likeDislike;
	private String reviewPhoto;
}
