package com.example.mokkoji_backend.service.goods;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;

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
	public List<ProductsDTO> findrecommendList(Long id) {
		List<Products> entities = repository.findTop4ByOrderByCountDescNative(id);
		return entities.stream()
			    .map(entity -> entityToDto(entity))
			    .collect(Collectors.toList());
	}
	
	ProductsDTO entityToDto(Products entity) {
		return ProductsDTO.builder()
				.categoryId(entity.getCategoryId())
				.guide(entity.getGuide())
				.id(entity.getId())
				.mainImageName(entity.getMainImageName())
				.name(entity.getName())
				.price(entity.getPrice())
				.options(entity.getOptions())
				.build();
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
