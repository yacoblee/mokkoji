package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistedHistoryDTO {
	private String registId;
	private String registCode;
	private String name;

	private String userId;
	private int teenagerCnt;
	private int adultCnt;
	private int personCnt;

	private Timestamp regDate;
	private Timestamp activeDate;

	private int teenager;
	private int adult;
	private int registCnt;

	private String imageName;
}
