package com.example.mokkoji_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchasehistory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistory {

	@Id
	@Column(name = "purchase_number")
	private int purchaseNumber;

	@Column(name = "user_id")
	private String userId;
	@Column(name = "address_id")
	private int addressId;

	@Column(name = "total")
	private int total;
	@Column(name = "method")
	private String method;
	@CreatedDate
	@Column(name = "reg_date")
	private LocalDateTime regDate;
	@Column(name = "purchase_status")
	private String  purchaseStatus;

}
