package com.example.mokkoji_backend.repository.login;

import java.util.List;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.entity.login.Users;

public interface UsersDSLRepository {

	
	
	List<Users> findUserinfoToSearch(PageRequestDTO requestDTO);
	
	
}
