package com.example.mokkoji_backend.entity.myPage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorite")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FavoriteId.class)
public class Favorite implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "user_id")
	private String userId;
	@Id
	@Column(name = "product_id")
	private int productId;

	@CreatedDate
	@Column(name = "favorite_date")
	private LocalDateTime favoriteDate;
}
