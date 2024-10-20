package com.example.mokkoji_backend.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSendMailDTO {

	private List<String> userId;
	private List<String> email;
	private List<String> name;
	private String mailTitle;
	private String mailContent;
	
	
}
