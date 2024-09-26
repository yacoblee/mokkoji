package com.example.mokkoji_backend.entity.registration;

import java.sql.Timestamp;

import com.example.mokkoji_backend.entity.login.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "registedhistory")
@Data
@NoArgsConstructor
@IdClass(RegistedhistoryId.class)  // 복합 키 클래스 사용
public class Registedhistory {
	 	@Id
	    @Column(name = "regist_id", nullable = false, length = 100)
	    private String registId;
	 	
	 	@Id
	    @ManyToOne
	    @JoinColumn(name = "regist_code", nullable = false)
	    private Regist regist;
	 	
	    @Id
	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private Users user;  // 복합 키로 사용
	    
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
