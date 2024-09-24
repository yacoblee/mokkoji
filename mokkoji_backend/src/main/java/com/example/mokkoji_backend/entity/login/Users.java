package com.example.mokkoji_backend.entity.login;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {

	@Id
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "birth_date")
	private LocalDateTime birthDate;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "user_sequence")
	private int userSequence;
	
	@Column(name = "is_withdrawn")
	private LocalDateTime isWithdrawn;
	
	@Column(name = "withdrawal_date")
	private LocalDateTime withdrawalDate;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name = "block_status")
	private int blockStatus;
		
}