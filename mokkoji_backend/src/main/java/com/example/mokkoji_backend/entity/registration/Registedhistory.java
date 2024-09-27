package com.example.mokkoji_backend.entity.registration;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "registedhistory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Registedhistory{

		@Id
	    @Column(name = "regist_id", nullable = false)
	    private int registId;
	
	    @Column(name = "regist_code", nullable = false)
	    private String registCode;  // 복합키로 등록된 registCode 필드

//	    @Id
//	    @ManyToOne
//	    @JoinColumn(name = "user_id", nullable = false)
//	    private Users user;  // 복합키로 사용될 user

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
