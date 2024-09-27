package com.example.mokkoji_backend.repository.registration;

 

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.registration.RegistImages;
import com.example.mokkoji_backend.entity.registration.RegistImagesId;


public interface RegistImageRepository extends JpaRepository<RegistImages, RegistImagesId>{
	
	public List<RegistImages> findByRegistCode(String registCode);
}
