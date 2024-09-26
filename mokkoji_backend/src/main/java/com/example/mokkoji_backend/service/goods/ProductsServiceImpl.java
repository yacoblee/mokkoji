package com.example.mokkoji_backend.service.goods;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {

	private final ProductsRepository repository;
	private final ProductsDSLRepository dsrepository;
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
	
	 ProductsDTO entityToDto(Products entity) {
		
		ProductsDTO dto = ProductsDTO.builder()
				.id(entity.getId())
				.price(entity.getPrice())
				.name(entity.getName())
				.categoryId(entity.getCategoryId())
				.mainImageName(entity.getMainImageName())
				.build();
				
		
		return dto;
	}
	
	@Override
	public List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id) {
		List<ProductsDTO> entities = dsrepository.recommendList(id);
		return entities;
	}
	

	
	@Override
	public ProductDetailDTO findDetailinfo( Long id) {
		
		return repository.findDetailinfo(id);
	}

	@Override
	public Products findById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public ProductsDTO findDto(Long id) {
		
		return repository.findDto(id);
	}
	@Override
	public void save(Products entity) {
		 repository.save(entity);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);

	}

}
