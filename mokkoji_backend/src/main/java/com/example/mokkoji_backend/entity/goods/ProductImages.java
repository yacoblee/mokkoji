package com.example.mokkoji_backend.entity.goods;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
