package com.example.mokkoji_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorite")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FavoriteId.class)
public class Favorite {

	@Id
	@Column(name = "user_id")
	private int userId;
	@Id
	@Column(name = "product_id")
	private String productId;

	@CreatedDate
	@Column(name = "favorite_date")
	private LocalDateTime favoriteDate;
}
