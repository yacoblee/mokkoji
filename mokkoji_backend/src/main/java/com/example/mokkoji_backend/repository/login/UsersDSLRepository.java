package com.example.mokkoji_backend.repository.login;

import org.springframework.data.domain.Page;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.entity.login.Users;

public interface UsersDSLRepository {

	
	
	Page<Users> findUserinfoToSearch(PageRequestDTO requestDTO);
	
	
}
