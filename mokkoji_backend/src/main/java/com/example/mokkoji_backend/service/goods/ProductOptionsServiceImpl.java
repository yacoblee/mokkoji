package com.example.mokkoji_backend.service.goods;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.goods.ProductOptions;
import com.example.mokkoji_backend.entity.goods.ProductOptionsId;
import com.example.mokkoji_backend.repository.ProductOptionsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductOptionsServiceImpl implements ProductoptionsService {
	private final ProductOptionsRepository repository;
	
	@Override
	public List<ProductOptions> findAll() {
		return repository.findAll();
	}

	@Override
	public List<ProductOptions> findByProductId(Long id) {
		
		return repository.findByProductId(id);
	}

	@Override
	public ProductOptions findById(ProductOptionsId id) {
		
		return repository.findById(id).get();
	}

	@Override
	public void save(ProductOptions options) {
		repository.save(options);

	}

	@Override
	public void deleteById(ProductOptionsId id) {
		repository.deleteById(id);

	}

}
