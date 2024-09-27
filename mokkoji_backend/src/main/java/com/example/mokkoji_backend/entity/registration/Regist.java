package com.example.mokkoji_backend.entity.registration;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "regist")
@Data
public class Regist {
		@Id
	    @Column(name = "regist_code")
	    private String registCode;

	    @Column(name = "name", length = 100)
	    private String name;

	    @Column(name = "regist_option", length = 100)
	    private String registOption;

	    @Column(name = "teenager")
	    private int teenager;

	    @Column(name = "adult")
	    private int adult;
	    
	    @Column(name = "hightlight_1")
	    private String hightlight1;
	    
	    @Column(name = "hightlight_2")
	    private String hightlight2;
	    
	    @Column(name = "hightlight_3")
	    private String hightlight3;
	    
	    @Column(name = "hightlight_4")
	    private String hightlight4;
	    
	    @Column(name = "package_detail")
	    private String packageDetail;
	    
	    @Column(name = "restrict_detail")
	    private String restrictDetail;
	    
	    @Column(name = "reserve_restrict")
	    private String reserveRestrict;
	    
	    @Column(name = "etc_detail")
	    private String etcDetail;
	    
//	    @OneToMany(mappedBy = "regist")
//	    private List<RegistImages> registImages;
	
}
