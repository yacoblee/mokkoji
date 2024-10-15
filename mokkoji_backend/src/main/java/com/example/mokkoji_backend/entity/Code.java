package com.example.mokkoji_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "code")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CodeId.class)
public class Code implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "main_type")
	private String main_type;
	
	@Id
	@Column(name = "sub_type")
	private String sub_type;
	
	@Column(name = "main_type_name")
	private String main_type_name;
	
	@Column(name = "sub_type_name")
	private String sub_type_name;
}
