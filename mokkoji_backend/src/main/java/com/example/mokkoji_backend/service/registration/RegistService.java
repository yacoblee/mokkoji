package com.example.mokkoji_backend.service.registration;


import java.util.List;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.entity.login.Users;



public interface RegistService {
	

	
	List<DateCountDTO> getCountsDays();
	
}
