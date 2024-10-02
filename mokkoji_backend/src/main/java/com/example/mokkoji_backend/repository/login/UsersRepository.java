package com.example.mokkoji_backend.repository.login;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Users;

public interface UsersRepository extends JpaRepository<Users, String>{

}
