package com.example.mokkoji_backend.entity.login;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Component
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {

	@Id
	@Column(name = "user_id", nullable = false)
	private String userId;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "birth_date")
	private LocalDate birthDate;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "user_sequence")
	private int userSequence;
	
	@Column(name = "is_withdrawn")
	private int isWithdrawn;
	
	@Column(name = "withdrawal_date")
	private LocalDateTime withdrawalDate;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@Column(name = "block_status")
	private int blockStatus;
	
	@Column(name= "is_admin")
	private String isAdmin;
		
}
