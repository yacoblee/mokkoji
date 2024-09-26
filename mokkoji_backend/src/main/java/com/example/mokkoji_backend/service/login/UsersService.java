package com.example.mokkoji_backend.service.login;


import com.example.mokkoji_backend.entity.login.Users;



public interface UsersService {
	
	// ** selectOne
	Users selectOne(String id);
	
	// ** insert, update
	void register (Users entity);
	
	// ** delete
	void deleteById(String id);
	
	
}
