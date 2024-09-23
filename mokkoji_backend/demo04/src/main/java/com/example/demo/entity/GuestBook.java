package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="guestbook") // 엔티티 클래스명과 동일하면 생략가능
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestBook extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long gno; // Auto_Increment;
	@Column(length=100, nullable = false)
	private String title; 
	@Column(length=1000, nullable = false)
	private String content;
	@Column(length=100, nullable = false)
	private String writer;

	public void changeTitle(String title) {
		this.title = title;
	}
	
	public void changeContent(String content) {
		this.content = content;
	}
	
}
