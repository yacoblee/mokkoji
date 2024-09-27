package com.example.mokkoji_backend.repository.login;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.mokkoji_backend.entity.login.Users;

public interface UserRepository extends JpaRepository<Users, String>{

	
	
	@Query("SELECT m.isAdmin FROM Users m WHERE m.id=:id")
	String getIsAdmin(@Param("id") String id);
}


