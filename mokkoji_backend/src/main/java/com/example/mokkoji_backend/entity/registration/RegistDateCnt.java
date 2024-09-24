package com.example.mokkoji_backend.entity.registration;


import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "registcnt")
@NoArgsConstructor
public class RegistDateCnt {
	
 
	
		@Id
	    @ManyToOne
	    @JoinColumn(name = "regist_id", nullable = false)
	    private Registedhistory registedHistory;

//	    @ManyToOne
//	    @JoinColumn(name = "user_id", nullable = true)
//	    private Users user;

	    @Column(name = "reg_date")
	    private Timestamp regDate;
 
	
}
 