package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.GuestBookDTO;
import com.example.demo.domain.PageRequestDTO;
import com.example.demo.domain.PageResultDTO;
import com.example.demo.entity.GuestBook;




//** JPA CRUD 구현
//=> JPA Pageable 을 이용한 Pageing
//=> JPA CRUD
//=> Entity 와 DTO를 용도별로 분리해서 사용
//  dtoToEntity() 와  entityToDto() 메서드추가 
//	즉, default 메서드로 작성



public interface GuestBookService {

	
	// JPA 기본 CRUD 구현
	List<GuestBook> selectList();
	List<GuestBookDTO> selectList2();
	
	
	GuestBook selectOne(Long gno);
	Long register(GuestBook entity);
	//=> Insert, Update 모두사용, 키 값을 return 
	void delete(Long gno);
	
	PageResultDTO<GuestBookDTO, GuestBook> pageList(PageRequestDTO requestDTO);
	
	//** Entity 와 DTO를 용도별로 분리해서 사용
	//=>  dtoToEntity() 
	// insert, update 용도로 주로 사용됨, 그러므로 regdate, moddate 는 제외가능
	default GuestBook dtoToEntity(GuestBookDTO dto){
		GuestBook entity = GuestBook.builder()
							.gno(dto.getGno())
							.title(dto.getTitle())
							.content(dto.getContent())
							.writer(dto.getWriter()).build();
		return entity;
	}
	//=>  entityToDto() 결과 출력용으로 주로사용 regdate, moddate 포함 
	default GuestBookDTO entityToDto(GuestBook entity) {
		
		
		return GuestBookDTO.builder().gno(entity.getGno())
					.title(entity.getTitle())
					.content(entity.getContent())
					.writer(entity.getWriter())
					.regdate(entity.getRegdate())
					.moddate(entity.getModdate()).build();
	}
	
	
	
}
