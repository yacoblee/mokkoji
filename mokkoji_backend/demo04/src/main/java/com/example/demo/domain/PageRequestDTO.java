package com.example.demo.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;



//** PageList 요청 처리 DTO
//=> 재사용 가능 구조: 다양한 Table에 적용가능
//=> JPA 에서 사용하는 Pageable Type 객체 생성을 목표로함.
// 아래 getPageable() 메서드로 구현

//** 주요객체
//=> Pageable (i) -> PageRequest (구현체)

//=> Pageable
//  스프링 데이터 JPA에서 제공하는 강력한 페이징 & 정렬 기능을 정의한 interface
  
//=> PageRequest ( Pageable interface의 구현클래스 )
//  - Sort type 을 인자로 전달 할 수 있음
//  - Sort 객체는 한개 이상의 컬럼값을 이용해서 정렬을 지정할수 있음.    

@Data
@Builder
@AllArgsConstructor
public class PageRequestDTO {

	private int page; //출력할 pageNo
	private int size; // rowsPerPage
	private String type; 
	private String keyword;
	
	public PageRequestDTO() {
		this.page = 1;
		this.size = 5;
	}
	
	public Pageable getPageable(Sort sort) {
		
		return PageRequest.of(page-1, size, sort);
		
		// => of: 페이징을 위한 데이터의 조건을 적어주는 메서드
        // => JPA 에서는 pageNo 가 0 부터 시작하기 때문에 page-1
        //       단, application.properties에서 변경가능  
        //      # pageable : 1페이지부터 시작하도록 변경
        //      spring.data.web.pageable.one-indexed-parameters=true
        
        // => sort: 필요시 사용을 위함.

	}
	
	
	
}// Class