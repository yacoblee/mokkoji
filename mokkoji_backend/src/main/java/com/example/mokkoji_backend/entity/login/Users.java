package com.example.mokkoji_backend.entity.login;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Component
@Table(name = "users")
@Builder
@Data
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
	
	
    @Column(name = "user_sequence", unique = true, nullable = false)
    private int userSequence;

    @Column(name = "is_withdrawn", columnDefinition = "int default 0")
    private int isWithdrawn;

    @Column(name = "withdrawal_date", nullable = true)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate withdrawalDate;

    @Column(name = "updated_at", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate updatedAt;
    
	
	@Column(name = "created_at")
	private LocalDate createdAt;
	
	@Column(name = "block_status", columnDefinition = "int default 0")
	private int blockStatus;
	
	@Column(name= "is_admin", columnDefinition = "String default 0")
	private String isAdmin;

	@Column(name = "login_count", columnDefinition = "int default 0")
	private int loginCount;
		
}
