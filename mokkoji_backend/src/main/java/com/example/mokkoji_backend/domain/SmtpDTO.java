package com.example.mokkoji_backend.domain;


import lombok.*;

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
 
    //향후 여유가 되면 생성할 예정
//    private List<String> items;
//    private String company;
//    
		
}
