package com.example.mokkoji_backend.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


//** PageList 요청 처리 DTO
//=> 재사용 가능 구조: 다양한 Table에 적용가능
//=> JPA 에서 사용하는 Pageable Type 객체 생성을 목표로함.
//아래 getPageable() 메서드로 구현

//** 주요객체 
//1) Pageable (i) -> PageRequest (구현체)
//=> Pageable (i) 
//   스프링 데이터 JPA에서 제공하는 강력한 페이징 & 정렬 기능을 정의한 interface
// 페이징을 지원하는 repository.findAll(pageable) 의 인자 Type
//=> PageRequest ( Pageable interface 의 구현체 )
//  - Sort type 을 인자로 전달 할 수 있음
//  - Sort 객체는 한개 이상의 컬럼값을 이용해서 정렬을 지정할수 있음.    
//=> PageRequest 의 메서드 of
//  - of(int page, int size) : 0부터 시작하는 페이지 번호와 개수. 정렬이 지정되지 않음
//  - of(int page, int size, Sort sort) : 페이지 번호와 개수, 정렬 관련 정보
//  - of(int page int size, Sort sort, Direction direction, String ... props) : 0부터 시작하는 페이지 번호와 개수, 정렬의 방향과 정렬 기준 필드들

//----------------------------------------------------------

//2) Page<T> (i)
//=> 페이징을 지원하는 repository.findAll(pageable) 의 return Type
//=> Page (i) -> 구현체 PageImpl
//=> 주요 메서드
//  - getTotalPages() : 총 페이지 수
//  - getTotalElements() : 전체 개수
//  - getNumber() : 현재 페이지 번호
//  - getSize() : 페이지 당 데이터 개수
//  - hasnext() : 다음 페이지 존재 여부
//  - isFirst() : 시작페이지 여부
//  - getContent() : 실제 컨텐츠를 가지고 오며 List<Entity> 반환 
//  - get() : 실제 컨텐츠를 가지고 오며 Stream<Entity> 반환
//
//  - stream()
//      . 조상인 Streamable<T> 인터페이스에 정의되어 있으며
//      . stream 을 생성하기에 적절한 자료(content)에 적용된다.  

//=> 상속관계
//- Streamable<T> i -> Slice<T> i -> Chunk<T> a, Page<T> i 
// -> PageImpl<T>

//public class PageImpl<T> extends Chunk<T> implements Page<T>
//abstract class Chunk<T> implements Slice<T>, Serializable {
//public interface Slice<T> extends Streamable<T> {

//@FunctionalInterface
//public interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {

//=> PageImpl<T> 의 생성자들 중에는
//  public PageImpl(List<T> content, Pageable pageable, long total)
//즉, Page<T> 는 JPA 에 의해 생성되면서 필요한 위의 값들을 받아 보관하고
//이들을 사용할수 있는 get 메서드들을 제공 (위의 주요 메서드 참고)  
//----------------------------------------------------------

//@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PageRequestDTO {//->페이징 조건들
    private static int page; //출력할 Page 번호
    private static int size; // 출력할 row 갯수
    private String type;// 카테고리 비교
    private String keyword;//검색어 비교
    
    public PageRequestDTO() {
    	this.page=1;
    	this.size=4;
    }// 기본 생성자를 활용하여 page 와 size를 초기화.
    
    public Pageable getPageable(Sort sort){
    	//return PageRequest.of(page-1, size, sort);
    	return PageRequest.of(page-1, size, sort);
        // => of: 페이징을 위한 데이터의 조건을 적어주는 메서드
        // => JPA 에서는 pageNo 가 0 부터 시작하기 때문에 page-1
        //       단, application.properties에서 변경가능  
        //      # pageable : 1페이지부터 시작하도록 변경
        //      spring.data.web.pageable.one-indexed-parameters=true
        // => sort: 필요시 사용을 위함.
    }//getPageable
}
