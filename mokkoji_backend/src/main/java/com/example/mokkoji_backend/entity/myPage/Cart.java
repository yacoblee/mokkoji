package com.example.mokkoji_backend.entity.myPage;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CartId.class)
@EntityListeners(AuditingEntityListener.class) // 추가: AuditingEntityListener 활성화
public class Cart implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "user_id")
	private String userId;
	@Id
	@Column(name = "product_id")
	private long productId;
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
	@CreatedDate
	@Column(name = "cart_date", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDateTime cartDate;

}
