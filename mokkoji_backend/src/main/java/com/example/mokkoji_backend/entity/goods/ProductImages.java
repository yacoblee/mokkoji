package com.example.mokkoji_backend.entity.goods;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@Column(name = "product_id", nullable = false)
	private Long productId;
	@Id
	@Column(name = "image_order", nullable = false)
	private int order;
	@Id
	@Column(name = "image_type", nullable = false)
	private String type;
	@Column(name = "image_name", nullable = false)
	private String name;
//	@Transient //SQL 구문처리에서 제외시켜줌
//	@JsonIgnore  // JSON 직렬화에서 제외
//	private MultipartFile uploadfilef;
}
