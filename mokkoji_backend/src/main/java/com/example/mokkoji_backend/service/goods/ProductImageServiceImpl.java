package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

	private final ProductsImagesRepository repository;
	
	@Override
	public List<ProductImages> findAll() {
		return repository.findAll();
	}

	@Override
	public List<ProductImages> findByProductIdAndType(Long productId, String type) {
		return repository.findByProductIdAndType(productId,type);
	}
	@Override
	public List<ProductImages> findByProductId(Long productId){
		return repository.findByProductId(productId);
	}
	@Override
	public ProductImages findById(ProductImagesId id) {
		
		return repository.findById(id).get();
	}

	@Override
	public void save(ProductImages entity) {
		repository.save(entity);

	}

	@Override
	public void deleteById(ProductImagesId id) {
		repository.deleteById(id);

	}

}
