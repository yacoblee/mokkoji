package com.example.mokkoji_backend.repository.registration;


import com.example.mokkoji_backend.entity.registration.RegistImages;
import com.example.mokkoji_backend.entity.registration.RegistImagesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RegistImageRepository extends JpaRepository<RegistImages, RegistImagesId>{
	
	public List<RegistImages> findByRegistCode(String registCode);
	
	
	void deleteByRegistCode(String registCode);
	
}
