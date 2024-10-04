package com.example.mokkoji_backend.service.login;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;



public interface UsersService {
	
	// ** selectOne
	Users selectOne(String id);
	
	// ** insert, update
	void registerUserAndAddress(UsersDTO userDTO);

	
	// ** delete
	void deleteById(String id);
	
	// ** findById
	Users findById(String name, String phonNumber);
	
	
	//** 유저 이메일 반환 
	Users findByUserIdAndPhoneNumber(String userId, String phonNumber);
}
