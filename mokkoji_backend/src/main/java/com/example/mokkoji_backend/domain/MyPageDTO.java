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
public class MyPageDTO {

	private String userId;
	private String name;
	private LocalDate birthDate;
	private String gender;
	private String phoneNumber;
	private String email;
	private LocalDate createdAt;
	private LocalDate updatedAt;

	private int favoritesCnt;
	private int cartCnt;

	private String postalCode;
	private String streetAddress;
	private String detailedAddress;

}
