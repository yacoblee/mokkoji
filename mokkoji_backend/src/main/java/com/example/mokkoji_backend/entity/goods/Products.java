package com.example.mokkoji_backend.entity.goods;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class) // 추가: AuditingEntityListener 활성화
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
	private String subDescription;
	@Column(name = "mainImageName")
	private String mainImageName;
	@Column(name = "likeCount", columnDefinition = "int default 0")
	private int likeCount;
	@Column(name = "status", columnDefinition = "int default 0")
	private int status;
	@Column(name = "stockCount", columnDefinition = "int default 0")
	private int stockCount;
	@Column(name = "uploadDate")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@LastModifiedDate
	private LocalDateTime uploadDate;
	@Column(name = "categoryId")
	private String categoryId;
	
	@Transient //SQL 구문처리에서 제외시켜줌
	 @JsonIgnore  // JSON 직렬화에서 제외
	private MultipartFile uploadfilef;
	
//	@ToString.Exclude
//	//@JsonManagedReference
//	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
//	//@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	private List<ProductOptions> options;
//	
	public Products(Long id,String name ,int price ,String mainImageName, String categoryId ,String guide) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
		this.guide = guide;
//		this.options = options;
	}
	
//	@Override
//	public String toString() {
//	    return "Products{id=" + id + ", name='" + name + "', price=" + price + "}";
//	}

}
