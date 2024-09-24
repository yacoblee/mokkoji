package com.example.mokkoji_backend.entity.login;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

	@Id
	@Column(name = "address_id")
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
	private String recipientName;	
	
	@Column(name = "recipient_phone")
	private String recipientPhone;	
	
	@Column(name = "is_default")
	private int isDefault;	
	
	@Column(name = "created_at")
	private LocalDateTime created_at;	
	

}
