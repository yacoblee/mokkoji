package com.example.mokkoji_backend.entity.registration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistedhistoryId implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
    private String registCode;
    private String registId;
    private String userId;  // Users 엔티티의 userId와 매핑
    
		
}
