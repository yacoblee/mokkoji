package com.example.mokkoji_backend.service.registration;

import com.example.mokkoji_backend.entity.registration.RegistImages;

import java.util.List;

public interface RegistImageService {
	List<RegistImages> findAll();

	List<RegistImages> findByRegistCode(String registCode);


}
