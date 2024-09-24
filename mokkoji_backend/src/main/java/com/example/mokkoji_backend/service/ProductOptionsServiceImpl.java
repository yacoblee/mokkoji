package com.example.mokkoji_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.Productoptions;
import com.example.mokkoji_backend.entity.ProductoptionsId;
import com.example.mokkoji_backend.repository.ProductOptionsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductOptionsServiceImpl implements ProductoptionsService {
	private final ProductOptionsRepository repository;
	
	@Override
	public List<Productoptions> findAll() {
		return repository.findAll();
	}

	@Override
	public List<Productoptions> findByProductId(Long id) {
		
		return repository.findByProductId(id);
	}

	@Override
	public Productoptions findById(ProductoptionsId id) {
		
		return repository.findById(id).get();
	}

	@Override
	public void save(Productoptions options) {
		repository.save(options);

	}

	@Override
	public void deleteById(ProductoptionsId id) {
		repository.deleteById(id);

	}

}
