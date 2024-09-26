package com.example.mokkoji_backend.entity.goods;

import java.io.Serializable;

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
@Table(name = "productimages")
@Data
@Builder
@IdClass(ProductImagesId.class)
@NoArgsConstructor
@AllArgsConstructor
public class ProductImages implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "productId", nullable = false)
	private Long productId;
	@Id
	@Column(name = "imageOrder", nullable = false)
	private int order;
	@Id
	@Column(name = "imageType", nullable = false)
	private String type;
	@Column(name = "imageName", nullable = false)
	private String name;
}
