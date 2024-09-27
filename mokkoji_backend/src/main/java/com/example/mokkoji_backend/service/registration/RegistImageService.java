package com.example.mokkoji_backend.service.registration;

import java.util.List;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import com.example.mokkoji_backend.entity.registration.RegistImages;

public interface RegistImageService {
	List<RegistImages> findAll();

	List<RegistImages> findByRegistCode(String registCode);


}
