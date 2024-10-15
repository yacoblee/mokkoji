package com.example.mokkoji_backend.entity.goods;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "packaging")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Packaging {
	@Id
	@Column(name = "packaging_option_content", nullable = false)
	private String packagingContent;
	@Column(name = "packaging_option_price", nullable = false)
	private int packagingPrice;
}
