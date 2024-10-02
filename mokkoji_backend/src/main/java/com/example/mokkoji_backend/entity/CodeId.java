package com.example.mokkoji_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String main_type;
	private String sub_type;
}
