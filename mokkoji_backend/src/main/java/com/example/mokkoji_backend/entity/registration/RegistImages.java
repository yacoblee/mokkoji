package com.example.mokkoji_backend.entity.registration;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "registimages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistImages {
	
	@Id
	@Column(name = "regist_code")
	private String registCode;
	 
	@Id
	@Column(name = "image_order")
	private int imageOrder;
	
	@Id
	@Column(name = "image_type")
	private String imageType;
	
	
	@Column(name = "image_name")
	private String imageName;
	
	
}


 