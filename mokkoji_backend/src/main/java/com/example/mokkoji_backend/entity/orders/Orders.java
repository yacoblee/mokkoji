package com.example.mokkoji_backend.entity.orders;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class) // 추가: AuditingEntityListener 활성화
//@IdClass(OrdersId.class)
public class Orders{

	//@Serial
	//private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "purchase_number")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int purchaseNumber;
	//@Id
	@Column(name = "user_id")
	private String userId;
	//@Id
	@Column(name = "street_address")
	private String streetAddress;

	@Column(name = "total")
	private int total;
	@Column(name = "method")
	private String method;
	@CreatedDate
	@Column(name = "reg_date", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate regDate;
	@Column(name = "purchase_status")
	private String purchaseStatus;

}
