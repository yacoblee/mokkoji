package com.example.mokkoji_backend.entity.myPage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "purchasehistory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(PurchaseHistoryId.class)
public class PurchaseHistory {

	@Id
	@Column(name = "purchase_number")
	private int purchaseNumber;
	@Id
	@Column(name = "user_id")
	private String userId;
	@Id
	@Column(name = "address_id")
	private int addressId;

	@Column(name = "total")
	private int total;
	@Column(name = "method")
	private String method;
	@Column(name = "reg_date")
	private LocalDate regDate;
	@Column(name = "purchase_status")
	private String purchaseStatus;

}
