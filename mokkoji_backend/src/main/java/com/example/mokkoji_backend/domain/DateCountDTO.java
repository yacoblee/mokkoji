package com.example.mokkoji_backend.domain;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

//@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DateCountDTO {
	  
		private Timestamp date;
		private Long count;
		
		
	  public DateCountDTO(Timestamp date, Long count) {
	        this.date = date;
	        this.count = count != null ? count : 0L; 
	    }
		
}
