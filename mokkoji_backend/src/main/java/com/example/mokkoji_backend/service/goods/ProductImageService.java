package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ProductImageService {
	List<ProductImages> findAll();

	List<ProductImages> findByProductIdAndType(Long productId, String type);
	List<ProductImages> findByProductId(Long productId);
	String uploadFile(MultipartFile file 
			,HttpServletRequest request)throws IOException;
	 void saveImages(List<ProductImages> imageList
				, MultipartFile[] files,
				HttpServletRequest request) throws IOException;
	ProductImages findById(ProductImagesId id);

	void save(ProductImages options);

	void deleteById(ProductImagesId id);
	void deleteEntity(ProductImages entity);
	void deleteImagesByProductId(Long productId);
}
