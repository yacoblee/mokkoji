package com.example.mokkoji_backend.domain;



import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DateCountDTO {
	
	   
		private Timestamp date;
		private long count;
		
		
		

	
	
}
