package com.example.mokkoji_backend.service.goods;



import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.mokkoji_backend.entity.goods.ProductImages;
import com.example.mokkoji_backend.entity.goods.ProductImagesId;
import com.example.mokkoji_backend.repository.goods.ProductsImagesRepository;
import com.example.mokkoji_backend.repository.goods.ProductsRepository;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

	private final ProductsImagesRepository repository;
	private final ProductsRepository productService;
	private final ServletContext servletContext;
	
	private String getProductImagesRealPath() {
	    String realPath = servletContext.getRealPath("/");
	    realPath += "resources" + File.separator + "productImages" + File.separator;
	    log.info("realPath :"+realPath);
	    return realPath;
	}
	
	@Override
	public List<ProductImages> findAll() {
		return repository.findAll();
	}
	private ProductImagesId returnId(ProductImages entity) {
		return ProductImagesId.builder()
				.productId(entity.getProductId())
				.order(entity.getOrder())
				.type(entity.getType())
				.build();
	}
	@Override
	public void deleteEntity(ProductImages entity) {
		ProductImagesId id = returnId(entity);
		deleteById(id);
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
		log.info("save 중 "+entity);
		repository.save(entity);

	}

	@Override
	public void deleteById(ProductImagesId id) {
		repository.deleteById(id);

	}
	
	@Override
	public String uploadFile(MultipartFile file)throws IOException {
		 LocalDateTime now = LocalDateTime.now();
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss_");
		 String formattedDate = now.format(formatter);
		//물리적 저장위치 확인
		String realPath = getProductImagesRealPath();
		// 디렉토리 생성 확인
	    File directory = new File(realPath);
	    if (!directory.exists()) {
	        directory.mkdirs();  // 디렉토리가 없으면 생성
	    }
	    log.info("저장될 위치 ? =>"+realPath);
		log.info("파일이 전달됨: - 이미지 수정이 있어야함 getOriginalFilename() : " + file.getOriginalFilename());
//		File oldfile = new File(realPath+entity.getMainImageName());
//		if(oldfile.isFile()) {
//			oldfile.delete();
//		}//이전 파일 삭제 로직
		String newFileName = formattedDate + file.getOriginalFilename();
		log.info("날짜 데이터 붙은 새로운 파일 이름"+newFileName);
		realPath += newFileName;
		file.transferTo(new File(realPath));//throws IOException 추가해야 함
		return newFileName; 
		//날짜 데이터 붙은 이미지 파일 이름 반환. 추후에 setName 같은거 넣어줘야함
	}
	
	@Override
	public void deleteImagesByProductId(Long productId) {
		List<ProductImages> list = findByProductId(productId);
		for (ProductImages image : list) {
			deleteEntity(image);
			File oldfile = new File(getProductImagesRealPath()+image.getName());
			if(oldfile.isFile()) {
				oldfile.delete();
			}//이전 파일 삭제 로직
		}
	}
	
	@Override
	//@Transactional // 트랜잭션 처리 적용
	public void saveImages(List<ProductImages> imageList
			, MultipartFile[] files) throws IOException{
		  Long productId = imageList.get(0).getProductId();
		  try {
			  // 1. 기존의 이미지 데이터를 삭제
			  deleteImagesByProductId(productId);
			  
			  // 2. 새로운 이미지 데이터를 처리
			  for (int i = 0; i < imageList.size(); i++) {
				  
				  MultipartFile file = null;
				  String imageName = imageList.get(i).getName();
				  int order = imageList.get(i).getOrder();
				  String type = imageList.get(i).getType();
				  if(type == null ||imageName==null ) {
					  continue;
				  }
				  if (files != null) {
					  // 파일과 이미지 이름을 비교하여 해당 파일을 찾음
					  for (int j = 0; j < files.length; j++) {
						  if (files[j].getOriginalFilename().equals(imageName)) {
							  file = files[j];
							  break; // 해당 파일을 찾으면 루프 종료
						  }
					  }
					  
					  // 파일이 존재하면 파일을 업로드
					  if (file != null) {
						  String uploadedFileName = uploadFile(file);
						  imageName = uploadedFileName;  // 파일 업로드 후 새로운 파일 이름으로 업데이트
					  }
					  
				  } else {
					  log.info(imageName + "는 이미지 파일을 유지합니다. imageName : " + imageName);
				  }
				  
				  // ProductImages 엔티티 생성
				  ProductImages productImage = ProductImages.builder()
						  .productId(productId)
						  .order(order)
						  .type(type)
						  .name(imageName)  // 파일 이름 업데이트
						  .build();
				  
				  // 데이터베이스에 저장
				  try {
					  save(productImage);
					  
				  } catch (Exception e) {
					  log.info("저장실패");
				  }
			
			  }
		} catch (Exception e) {
			log.info("전체 오류");
		}
	}
	
	public void saveImageListWithProduct(MultipartFile[] imageList,Long productId ,String type) throws IOException {
		for (int i = 0; i < imageList.length; i++) {
			MultipartFile image = imageList[i];
			String newName = uploadFile(image);
			log.info("saveList 파일 저장 이름 : "+newName);
			ProductImages entity = ProductImages.builder()
			         .productId(productId)
		                .name(newName)
		                .type(type)
		                .order(i + 1) // i는 0부터 시작하므로, 순서값은 i + 1로 설정
		                .build();
			log.info(entity);
			save(entity);
		}
		
	}
	

}
