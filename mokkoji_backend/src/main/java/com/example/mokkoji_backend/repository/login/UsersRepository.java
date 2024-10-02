package com.example.mokkoji_backend.repository.login;

import com.example.mokkoji_backend.entity.login.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, String>{
	   Optional<Users> findByNameAndPhoneNumber(String name, String phoneNumber);
}
