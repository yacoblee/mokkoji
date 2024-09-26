package com.example.mokkoji_backend.service.goods;

import java.util.List;

import com.example.mokkoji_backend.entity.goods.Packaging;

public interface PackagingService {
	List<Packaging> findAll();

	Packaging findById(String packagingContent);

	void save(Packaging entity);

	void deleteById(String packagingContent);
}
