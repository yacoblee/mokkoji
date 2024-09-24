package com.example.mokkoji_backend.service.goods;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {

	private final ProductsRepository repository;
	//private final ProductsDSLRepository dsrepository;
	@Override
	public List<Products> findAll() {
		return repository.findAll();
	}
	
	@Override
	public List<ProductsDTO> findList() {	
		return repository.findList();
	}
	
	@Override
	public List<ProductsDTO> findByCategoryId(String categoryId){
		return repository.findByCategoryId(categoryId);
	}

	@Override
	public Products findById(Long id) {
		return repository.findById(id).get();
	}
	//public ProductsDTO findByJoinOne(Long id) {
	//	return dsrepository.findByJoinOne(id);
	//}

	@Override
	public void save(Products entity) {
		 repository.save(entity);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);

	}

}
