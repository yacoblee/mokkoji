package com.example.mokkoji_backend.service.goods;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.ProductDetailDTO;
import com.example.mokkoji_backend.domain.ProductsDTO;
import com.example.mokkoji_backend.entity.goods.Products;
import com.example.mokkoji_backend.pageTest.Criteria;
import com.example.mokkoji_backend.repository.goods.ProductsDSLRepository;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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
	public PageResultDTO<ProductsDTO, Products> findByCategoryId(PageRequestDTO requestDTO){
		//Pageable pageable = requestDTO.getPageable(Sort.by("uploadDate").descending());
		Page<Products> result = repository.findByCategoryId(requestDTO.getType(),requestDTO.getPageable());
		 List<Products> dtoList = result.getContent();
		 return new PageResultDTO<>(result , e->dslentityToDto(e));
	}
	
//	public ProductsDTO entityToDto(Products product) {
//	    return ProductsDTO.builder()
//	            .id(product.getId())
//	            .name(product.getName())
//	            .price(product.getPrice())
//	            .mainImageName(product.getMainImageName())
//	            .categoryId(product.getCategoryId())
//	            .mainDescription(product.getMainDescription())
//	    
//	            .build();
//	}
	
	public ProductsDTO dslentityToDto(Products product) {
		return dsrepository.entityToDto(product);
	}
	 
	 @Override
	 public PageResultDTO<ProductsDTO, Products> findByCategoryIdAndNameContaining(PageRequestDTO requestDTO) {
		 Page<Products> result = repository.findByCategoryIdAndNameContaining(requestDTO.getType(),requestDTO.getKeyword(),requestDTO.getPageable());
		 //List<Products> dtoList = result.getContent();
		 return new PageResultDTO<>(result , e->dslentityToDto(e));
	 }
	 
	 @Override
	public PageResultDTO<ProductsDTO, Products> findByNameContaining(PageRequestDTO requestDTO) {
		 
		 Page<Products> result = repository.findByNameContaining(requestDTO.getKeyword(), requestDTO.getPageable());

		 //List<Products> dtoList = result.getContent();
		return new PageResultDTO<>(result , e->dslentityToDto(e));
	}
	 
	 public PageResultDTO<ProductsDTO, Products> findPageAll(PageRequestDTO requestDTO){
		 Page<Products> result = repository.findAll(requestDTO.getPageable());
		 return new PageResultDTO<>(result , e->dslentityToDto(e));
	 }
	
	@Override
	public List<ProductsDTO> findTop4ByOrderByCountDescNative(Long id) {
		List<ProductsDTO> entities = dsrepository.recommendList(id);
		return entities;
	}
	
	public List<Products> findAllProducts(Criteria cri) {
	    // Pageable 객체 생성 (페이지 번호는 0부터 시작하므로 -1 필요)
	    Pageable pageable = PageRequest.of(cri.getCurrentPage() - 1, cri.getRowsPerPageCount());
	    Page<Products> productPage = repository.findAll(pageable);

//	    // Page 객체에서 리스트 추출 및 변환
//	    List<ProductsDTO> list = productPage.getContent().stream()
//	            .map(entity -> entityToDto(entity)) // 변환 로직 적용
//	            .collect(Collectors.toList());
	    return productPage.getContent();
	}
	
	//@Override
	//public int countByAll() {
	//	return repository.countBy();
	//}
	
	//@Override
	//public int countByCategoryId(String CategoryId) {
	//	
	//	return repository.countByCategoryId(CategoryId);
	//}
	
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
