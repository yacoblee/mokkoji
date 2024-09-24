package com.example.mokkoji_backend.entity.goods;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Products {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
	// AUTO_INCREMENT를 처리하는 애노테이션
	
	@Column(name = "productId", nullable = false)
	private Long id;
	
	@Column(name = "productName", nullable = false)
	private String name;
	@Column(name = "productPrice", nullable = false)
	private int price;
	@Column(name = "productSizeInfo",columnDefinition = "text CHARACTER SET utf8mb4 ")
	private String sizeInfo;
	@Column(name = "productGuide",columnDefinition = "text CHARACTER SET utf8mb4 ")
	private String guide;
	@Column(name = "productMainDescription",columnDefinition = "text CHARACTER SET utf8mb4 ")
	private String mainDescription;
	@Column(name = "productAdditionalDescription",columnDefinition = "text CHARACTER SET utf8mb4 ")
	private String sub_description;
	@Column(name = "mainImageName")
	private String mainImageName;
	@Column(name = "likeCount", columnDefinition = "int default 0")
	private int like_conut;
	@Column(name = "status", columnDefinition = "int default 0")
	private int status;
	@Column(name = "stockCount", columnDefinition = "int default 0")
	private int stock_count;
	@Column(name = "uploadDate", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
	private LocalDateTime uploadDate;
	@Column(name = "categoryId")
	private String categoryId;
	
	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
	private List<ProductOptions> options;
	

}
