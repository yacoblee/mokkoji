package com.example.mokkoji_backend.entity.myPage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CartId.class)
public class Cart implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "user_id")
	private String userId;
	@Id
	@Column(name = "product_id")
	private int productId;
	@Id
	@Column(name = "option_content")
	private String optionContent;
	@Id
	@Column(name = "packaging_option_content")
	private String packagingOptionContent;

	@Column(name = "product_cnt")
	private int productCnt;
	@Column(name = "product_total_price")
	private int productTotalPrice;
	@Column(name = "cart_date")
	private LocalDate cartDate;

}
