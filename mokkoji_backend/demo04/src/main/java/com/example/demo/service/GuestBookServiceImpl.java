
package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.domain.GuestBookDTO;
import com.example.demo.domain.PageRequestDTO;
import com.example.demo.domain.PageResultDTO;
import com.example.demo.entity.GuestBook;
import com.example.demo.repository.GuestBookRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
//=> 각필드에 대해 1개의 매개변수가 있는 생성자를 생성함.
//=> 초기화 되지 않은 모든 final 필드에만 적용됨. 
public class GuestBookServiceImpl implements GuestBookService {
    
    private final GuestBookRepository repository;
    // => JPA Sql 처리를 위해정의
    //    생성자 주입 ( @RequiredArgsConstructor 를 통해 주입받음 )
    // => 도중에 값 변경을 막고 안전하게 사용하기 위해 final 을 적용함 
    //     ( 문법적으로 강제조항은 아님 ) 
    
    // ** JPA 기본 CRUD 구현 : JpaRepository 활용
  
	@Override
	public PageResultDTO<GuestBookDTO, GuestBook> pageList(PageRequestDTO requestDTO) {
		
		// 1) 조건완성
		Pageable pageable = requestDTO.getPageable( Sort.by("gno").descending() );
		// 2) repository 실행
		// Pageable 을 잊나로 하는 findAll 메서드 제공(Page<E> Type 결과 return)
		// 
		Page<GuestBook> result = repository.findAll(pageable);
		// 3) Function<EN, DTO>정의
		Function<GuestBook, GuestBookDTO> fn =  entity -> entityToDto(entity);
		// 4) 결과 return
//		return new PageResultDTO<>(result, fn);
		return new PageResultDTO<>(result, entity ->entityToDto(entity));
	}
    
	//** PageList 요청 처리 DTO
	//=> 재사용 가능 구조: 다양한 Table에 적용가능
	//=> JPA 에서 사용하는 Pageable Type 객체 생성을 목표로함.
	// 아래 getPageable() 메서드로 구현

	//** 주요객체 
	//1) Pageable (i) -> PageRequest (구현체)
	//=> Pageable (i) 
//	     스프링 데이터 JPA에서 제공하는 강력한 페이징 & 정렬 기능을 정의한 interface
	//   페이징을 지원하는 repository.findAll(pageable) 의 인자 Type
	//=> PageRequest ( Pageable interface 의 구현체 )
//	    - Sort type 을 인자로 전달 할 수 있음
//	    - Sort 객체는 한개 이상의 컬럼값을 이용해서 정렬을 지정할수 있음.    
	//=> PageRequest 의 메서드 of
//	    - of(int page, int size) : 0부터 시작하는 페이지 번호와 개수. 정렬이 지정되지 않음
//	    - of(int page, int size, Sort sort) : 페이지 번호와 개수, 정렬 관련 정보
//	    - of(int page int size, Sort sort, Direction direction, String ... props) : 0부터 시작하는 페이지 번호와 개수, 정렬의 방향과 정렬 기준 필드들

	// ----------------------------------------------------------

	//2) Page<T> (i)
	// => 페이징을 지원하는 repository.findAll(pageable) 의 return Type
	// => Page (i) -> 구현체 PageImpl
	// => 주요 메서드
//	    - getTotalPages() : 총 페이지 수
//	    - getTotalElements() : 전체 개수
//	    - getNumber() : 현재 페이지 번호
//	    - getSize() : 페이지 당 데이터 개수
//	    - hasnext() : 다음 페이지 존재 여부
//	    - isFirst() : 시작페이지 여부
//	    - getContent() : 실제 컨텐츠를 가지고 오며 List<Entity> 반환 
//	    - get() : 실제 컨텐츠를 가지고 오며 Stream<Entity> 반환

//	    - stream()
//	        . 조상인 Streamable<T> 인터페이스에 정의되어 있으며
//	        . stream 을 생성하기에 적절한 자료(content)에 적용된다.  

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    @Override
    public List<GuestBook> selectList() {
        return repository.findAll();
    }
    
    @Override
    public List<GuestBookDTO> selectList2() {
        List<GuestBook> list = repository.findAll(); 
        
        //ver01
        //Function<GuestBook, GuestBookDTO> fn =  entity -> entityToDto(entity) ;
        //List<GuestBookDTO> list2 = list.stream().map(fn).collect(Collectors.toList()) ;
        // collect() : stream 의결과를 원하느 자료형으로 바꿔 변환해주는 최종 연산자
        // collectors.tolist() :Stream 을 List 형태로 바꿔줌
        
        
        //ver02 Function 생략
        //return list.stream().map(entity -> entityToDto(entity)).collect(Collectors.toList());

        //ver03 list 생략
        return repository.findAll().stream().map(entity-> entityToDto(entity)).collect(Collectors.toList());
    }
    
    @Override
    public GuestBook selectOne(Long gno) {
        
        // ** Optional<T>
        // => Java8부터 Optional<T>클래스를 사용해 NullPointerException(이하 NPE)를 방지할수 있도록 지원.
        //      즉, Optional<T>는 null이 올수 있는 값을 감싸는 Wrapper클래스로, 
        //      참조하더라도 NPE가 발생하지 않도록 도와줌.
        //      제공되는 메소드로 복잡한 조건문 없이 NPE를 회피할 수 있어록 해줌
        // => isPresent() : Optional객체에 저장된 값이 null인지 확인 ( false 면 null )
        // => get() : Optional객체에 저장된 값 제공
        
        Optional<GuestBook> result = repository.findById(gno);
        if ( result.isPresent() ) return result.get();
        else return null;
    }
    
    @Override
    public Long register(GuestBook entity) {
        entity = repository.save(entity);  
        //=> 없으면 insert, 있으면 update
        //=> 처리후 입력완료된 entity 를 return
        return entity.getGno();
    }
    
    @Override
    public void delete(Long gno) {
//    	if(!repository.existsById(gno) ) {
//    		throw new Exception("data not found " + gno);
//    		
//    	}
    	repository.deleteById(gno);
    }



}