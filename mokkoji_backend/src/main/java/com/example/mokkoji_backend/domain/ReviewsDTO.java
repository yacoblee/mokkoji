package com.example.mokkoji_backend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDateTime reviewDate;
	private boolean likeDislike;
	private String reviewPhoto;

	private MultipartFile reviewPhotoF;
}
