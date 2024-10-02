package com.example.mokkoji_backend.entity.login;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

	@Id
	@Column(name = "address_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int addressId;

	@Column(name = "user_id")
	private String userId;

	@Column(name = "postal_code")
	private String postalCode;

	@Column(name = "street_address")
	private String streetAddress;

	@Column(name = "detailed_address")
	private String detailedAddress;

	@Column(name = "recipient_name")
	private String recipientName = "집"; // 기본값으로 '집' 설정

	@Column(name = "recipient_phone")
	private String recipientPhone;

	@Column(name = "is_default")
	private int isDefault = 0;

	@Column(name = "created_at")
	private LocalDate created_at;

}
