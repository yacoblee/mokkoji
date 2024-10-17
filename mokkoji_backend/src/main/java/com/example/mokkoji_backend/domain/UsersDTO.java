package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder 
public class UsersDTO {

	private String userId;
	private String password;
	private String name;
	private LocalDate birthDate;
	private String gender;
	private String phoneNumber;
	private String email;
	private int userSequence;
	private int isWithdrawn;
	private LocalDate withdrawalDate;
	private LocalDate updatedAt;
	private LocalDate createdAt;
	private int blockStatus;
	private String isAdmin;
	private String token;
	private int loginCount;
	
	private String postalCode;
	private String streetAddress;
	private String detailedAddress;
	private int isDefault;
	private String locationName;
	private String recipientName;
	private String recipientPhone;
	private String userCode;
}