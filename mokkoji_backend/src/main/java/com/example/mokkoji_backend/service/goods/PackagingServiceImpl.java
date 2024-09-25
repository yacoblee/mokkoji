package com.example.mokkoji_backend.service.goods;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.goods.Packaging;
import com.example.mokkoji_backend.repository.goods.PackagingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PackagingServiceImpl implements PackagingService {

	private final PackagingRepository repository;

	@Override
	public List<Packaging> findAll() {
		return repository.findAll();
	}

	@Override
	public Packaging findById(String packagingContent) {
		return repository.findById(packagingContent).get();
	}

	@Override
	public void save(Packaging entity) {
		repository.save(null);

	}

	@Override
	public void deleteById(String packagingContent) {
		repository.deleteById(packagingContent);

	}

}
