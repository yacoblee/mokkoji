package com.example.mokkoji_backend.entity.myPage;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	private String userId;
	@Id
	@Column(name = "product_id")
	private int productId;

	@CreatedDate
	@Column(name = "favorite_date")
	private LocalDateTime favoriteDate;
}
