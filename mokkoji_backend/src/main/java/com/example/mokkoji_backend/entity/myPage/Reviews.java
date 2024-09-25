package com.example.mokkoji_backend.entity.myPage;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reviews implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "review_id")
	private int reviewId;

	@Column(name = "user_id")
	private String userId;
	@Column(name = "product_id")
	private int productId;

	@Column(name = "review_content")
	private String reviewContent;
	@Column(name = "review_date")
	private LocalDateTime reviewDate;
	@Column(name = "like_dislike")
	private boolean likeDislike;
	@Column(name = "review_photo")
	private String reviewPhoto;

}
