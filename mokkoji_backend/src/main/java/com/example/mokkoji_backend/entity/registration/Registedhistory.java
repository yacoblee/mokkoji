package com.example.mokkoji_backend.entity.registration;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "registedhistory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Registedhistory{

		@Id
	    @Column(name = "regist_id", nullable = false)
	    private String registId;
	
	    @Column(name = "regist_code", nullable = false)
	    private String registCode;  // 복합키로 등록된 registCode 필드


	    // 복합 키에 포함된 userId 필드
	    @Column(name = "user_id")
	    private String userId;  
	    
	    @Column(name = "teenager_cnt")
	    private int teenagerCnt;

	    @Column(name = "adult_cnt")
	    private int adultCnt;

	    @Column(name = "person_cnt")
	    private int personCnt;

	    @Column(name = "regist_cnt")
	    private int registCnt;

	    @Column(name = "reg_date")
	    private Timestamp regDate;

	    @Column(name = "active_date")
	    private Timestamp activeDate;


}
