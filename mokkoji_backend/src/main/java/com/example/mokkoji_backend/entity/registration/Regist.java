package com.example.mokkoji_backend.entity.registration;


import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "regist")
@Data
public class Regist {
		@Id
	    @Column(name = "regist_code", nullable = false, length = 100)
	    private String registCode;

	    @Column(name = "name", length = 100)
	    private String name;

	    @Column(name = "regist_option", length = 100)
	    private String registOption;

	    @Column(name = "teenager")
	    private int teenager;

	    @Column(name = "adult")
	    private int adult;
	    
	    @OneToMany(mappedBy = "regist")
	    private List<RegistImages> registImages;
	
}
