package com.example.mokkoji_backend.entity.registration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "registedhistory")
@Data
@NoArgsConstructor
public class Registedhistory {
	 @Id
	    @Column(name = "regist_id", nullable = false, length = 100)
	    private String registId;

	    @ManyToOne
	    @JoinColumn(name = "regist_code", nullable = true)
	    private Regist regist;

//	    @ManyToOne
//	    @JoinColumn(name = "user_id", nullable = true)
//	    private Users user;

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

	    @OneToMany(mappedBy = "registedHistory")
	    private List<RegistDateCnt> registDateCntList;

}
