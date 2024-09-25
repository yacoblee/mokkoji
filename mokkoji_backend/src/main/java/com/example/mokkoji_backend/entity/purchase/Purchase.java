package com.example.mokkoji_backend.entity.purchase;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "purchasehistory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(PurchaseId.class)
public class Purchase implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

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
