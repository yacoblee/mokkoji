package com.example.mokkoji_backend.entity.registration;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "registimages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(RegistImagesId.class)
public class RegistImages implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
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


 