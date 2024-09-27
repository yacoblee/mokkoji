package com.example.mokkoji_backend.service.registration;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import com.example.mokkoji_backend.entity.registration.RegistImages;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.repository.registration.RegistImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistImageServiceImpl implements RegistImageService {

	private final RegistImageRepository repository;
	

	@Override
	public List<RegistImages> findAll() {
		return null;
	}
	
	
	@Override
	public List<RegistImages> findByRegistCode(String registCode) {
		return repository.findByRegistCode(registCode);
	}
	
	
}
