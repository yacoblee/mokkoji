package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="jo") // 엔티티 클래스명과 동일하면 생략가능
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Jo {
	@Id
	private int jno;
	private String jname;
	private String captain;
	private String project;
	private String slogan;
	
}
