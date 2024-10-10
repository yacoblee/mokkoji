package com.example.mokkoji_backend.entity.myPage;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class) // 추가: AuditingEntityListener 활성화
public class Reviews implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "review_id")
	private int reviewId;

	@Column(name = "user_id")
	private String userId;
	@Column(name = "product_id")
	private long productId;

	@Column(name = "review_content")
	private String reviewContent;
	@CreatedDate
	@Column(name = "review_date", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDateTime reviewDate;
	@Column(name = "like_dislike")
	private boolean likeDislike;
	@Column(name = "review_photo")
	private String reviewPhoto;

	@Transient
	private MultipartFile reviewPhotoF;

}
