package com.example.mokkoji_backend.repository.login;

import com.example.mokkoji_backend.entity.login.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String>{

}
