package com.example.mokkoji_backend.repository.login;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Users;

public interface UsersRepository extends JpaRepository<Users, String>{
	   Optional<Users> findByNameAndPhoneNumber(String name, String phoneNumber);
}
