package com.example.mokkoji_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistDTO {
	private String registName;
    private int adultPrice;
    private int teenagerPrice;
    private String packageDetail;
    private String restrictDetail;
    private String reserveRestrict;
    private String etcDetail;
    
    @JsonProperty("highlights")
    private Map<String, String> highlights;

    
    
    
    
}
