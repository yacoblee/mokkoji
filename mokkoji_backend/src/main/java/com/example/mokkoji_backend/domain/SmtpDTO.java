package com.example.mokkoji_backend.domain;



import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Data
@Builder
public class SmtpDTO {
	  
    private String contentName;
    private String contentTitle;
    private String contentMail;
    private String contentMain;
 
		
}
