package com.example.mokkoji_backend.entity.goods;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "productoptions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ProductOptionsId.class)
public class ProductOptions implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="product_id")
	private Long productId;
	@Id
	@Column(name="option_content")
	private String content;
	@Column(name="option_price")
	private int price;
	
//	@ManyToOne
//	@JsonBackReference
//	//@MapsId("productId") // `productId` 필드와 외래 키를 매핑
//    @JoinColumn(name = "productId" ,insertable = false)
//	private Products product;
}
