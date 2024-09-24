package com.example.mokkoji_backend.entity.registration;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "regist")
@Data
public class Regist {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
	 
	
	@Column(name = "registCode", nullable = false)
	private Long id;
	
	@Column(name = "name", nullable = false)
	private String name;
	@Column(name = "registOption")
	private String size_info;
	@Column(name = "teenager", nullable = false)
	private int teenprice;
	@Column(name="adult") 
	private int adultprice;
	
}
