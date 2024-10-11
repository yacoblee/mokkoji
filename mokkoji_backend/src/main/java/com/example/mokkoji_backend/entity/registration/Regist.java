package com.example.mokkoji_backend.entity.registration;


import java.time.LocalDateTime;
import java.util.List;

import com.example.mokkoji_backend.domain.RegistDTO;
import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.Products;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "regist")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
	    
	    
	    
	    public static Regist fromDTO(RegistDTO dto) {
	        return Regist.builder()
	        		.name(dto.getRegistName())
	                .teenager(dto.getTeenagerPrice())
	                .adult(dto.getAdultPrice())
	                .hightlight1(dto.getHighlights().getOrDefault("hightlight_1", null))
	                .hightlight2(dto.getHighlights().getOrDefault("hightlight_2", null))
	                .hightlight3(dto.getHighlights().getOrDefault("hightlight_3", null))
	                .hightlight4(dto.getHighlights().getOrDefault("hightlight_4", null))
	                .packageDetail(dto.getPackageDetail())
	                .restrictDetail(dto.getRestrictDetail())
	                .reserveRestrict(dto.getReserveRestrict())
	                .etcDetail(dto.getEtcDetail())
	                .build();
	    }
	
}
