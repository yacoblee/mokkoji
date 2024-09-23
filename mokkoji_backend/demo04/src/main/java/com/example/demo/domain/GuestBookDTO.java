package com.example.demo.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestBookDTO {

	
	private Long gno; // Auto_Increment;
	private String title; 
	private String content;
	private String writer;
	private LocalDateTime regdate, moddate;

	
}
