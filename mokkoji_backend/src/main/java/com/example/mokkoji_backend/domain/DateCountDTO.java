package com.example.mokkoji_backend.domain;



import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DateCountDTO {
	  
		private Timestamp date;
		private Long count;
		
		
	  public DateCountDTO(Timestamp date, Long count) {
	        this.date = date;
	        this.count = count != null ? count : 0L; // null 방어를 위해 기본값 설정
	    }
		
}
