package com.example.mokkoji_backend.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	private LocalDateTime withdrawalDate;
	private LocalDateTime updatedAt;
	private LocalDate createdAt;
	private int blockStatus;
	private String postalCode;
	private String streetAddress;
	private String detailedAddress;
	private String isAdmin;
	private String token;
}
