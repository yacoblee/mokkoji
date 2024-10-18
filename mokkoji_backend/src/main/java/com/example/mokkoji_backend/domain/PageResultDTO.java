package com.example.mokkoji_backend.domain;
//** PageList 결과 처리 DTO

//=> JPA를 사용하는 Repository에서는 Page 처리결과를 
//   Page<Entity> Type으로 return하기 때문에 서비스계층에서 
//    이를 처리할 수 있도록 하는 DTO클래스가 필요함.
//=> 주요기능
//  - Page<Entity> 객체들을 DTO 객체로 변환해서 List에 담아줌
//  - 화면출력을 위한 페이지 정보들 구성

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

//-------------------------------------------------

//** Function <T, R> 
//=> T type 입력받아 R type return
//=> FunctionalInterface ( java01, j17_Lamda 참고 )

//** Collection 계층도
//=> Collection (i) -> List (i) -> ArrayList (c)  
//=> Collections
// - Collection 들의 WrapperClass
// - Collection 과 관련된 편리한 메서드를 제공 -> Collections.sort(List<T> list)

//** interface Collector
//=> 스트림의 collect() 메서드에서 사용될 메서드를 정의해놓은 인터페이스
//=> 이를 구현한 클래스가 Collectors 임.
// - toList(), toSet(), toMap(), toCollection()... 
//=> https://blog.naver.com/writer0713/221806454412

//** IntStream
//=> Java 8에서 추가된 Stream Interface의 한 종류
//=> int 형식의 요소들을 처리하기 위한 메소드들을 제공하며, 
//  int 배열의 요소를 합산하거나, 필터링하거나, 매핑하는 기능을 지원한다.
//=> 기본자료형 int 형식의 연산에 최적화 되어있어 성능적으로 이점을 가진다.

//-------------------------------------------------

@Data
public class PageResultDTO<DTO, EN> {// ->최종결과
	// <DTO ,Entity> -> 타입지정
	// 1. DTO List 페이지결과(데이터 + 페이지정보) 필요
	List<DTO> dtoList;

	// 2. 전체 총 페이지 수 필요
	private int totalPage;

	// 3. 요청 받은 현재 페이지 번호.
	private int currentPage;

	// 4. 출력할 row 갯수
	private int size;

	// 5. 시작 번호 끝 번호
	private int startPage, endPage;

	// 6. 전후 여부의 판단
	private boolean hasprev, hasnext;

	// 7. pager의 리스트 < 1 , 2 , 3 > => [1,2,3]
	private List<Integer> pageList;
	
	private long totalElements;

	// 8. 인자를 가진 생성자 정의 : 제네릭은 사용되지 않아도 됨.
	// ** 생성자 정의
	// => 제네릭은 컴파일 타임에 타입을 전달해서 결정하는 것으로
	// 생성자메서드 정의시에는 정의하지 않음 (정의하면 오히려 컴파일 오류발생)
	// => Page<EN> type 을 이용해 최종 List<DTO> 생성
	// => Function<EN, DTO> : Entity 객체들을 DTO로 변환
	public PageResultDTO(Page<EN> result, Function<EN, DTO> fn) {
		dtoList = result.stream().map(fn).collect(Collectors.toList());// 엔티티 리스트를 DTO 리스트로 변환
		totalPage = result.getTotalPages();// 전체 페이지 수 설정 (repository.findAll(pageable))
		totalElements = result.getTotalElements();
		
		System.out.println("0 . 검색결과 갯수 : "+result.getTotalElements());
		makePageList(result.getPageable());// 페이지 목록 생성
        //=> stream()
        //    - 배열, 컬렉션등을 대상으로하여 스트림을 생성해줌
        //    - 스트림은 forEach(), filter(), sum(), map() 등 다양한 연산을 할수있는 메서드 제공  
        //    - Page 객체에서는 stream 을 생성하기에 적절한 자료(content)에 적용됨   -
        //=> map(fn)
        //    - 스트림 요소 중에서 원하는 필드만 뽑아내거나, 특정 형태로 변환해야 할 때 사용
        //    - Entity 객체들을 DTO로 변환
        //=> collect()
        //    - 스트림의 요소들을 수집하는 최종연산
        //    - Collectors 클래스의 toList(): 스트림의 모든 요소를 List 로 수집 
	}// 생성자

	private void makePageList(Pageable pageable) {
		// 1. 현재 페이지 번호 (0-based index이므로 +1)
		this.currentPage = pageable.getPageNumber() + 1;
		// JPA에서 페이지는 0부터 시작하므로, +1을 해서 1부터 시작하도록 처리
		System.out.println("1. 현재 페이지 번호 currentPage : "+currentPage);
		// 2. 한 페이지에 표시할 항목 수
		this.size = pageable.getPageSize();
		// 페이지당 항목 수 (size)
		System.out.println("한 페이지에 표시할 항목 수 size : "+size);
		// 3. 보여줄 페이지 목록의 끝 페이지 계산
		int tempEnd = (int) (Math.ceil(currentPage / (double) size)) * size;
		// tempEnd 는 현재 페이지를 기준으로 표시할 마지막 페이지 번호 <1 , 2 , 3 > : 3
		System.out.println("3. 보여줄 페이지 목록의 끝 페이지 계산  tempEnd: "+tempEnd);
		// 4. 페이지 시작 번호 설정
		startPage = tempEnd - size + 1;
		// 페이징의 시작 페이지를 결정
		// 페이지 목록을 한 번에 몇 개씩 보여줄지를 결정하는 size 값과 현재 페이지를 기반으로 시작 페이지를 설정

		// 5. 페이지 끝번호 설정
		endPage = Math.min(totalPage, tempEnd);
		// 전체 페이지 수(totalPage)와 계산된 끝 페이지(tempEnd) 중 작은 값을 선택하여, 실제로 표시할 끝 페이지를 결정

		// 6.전페이지 후페이지 활성화를 위한 boolean
		hasprev = startPage > 1;
		// hasprev: startPage가 1보다 크면 이전 페이지로 이동할 수 있음을 의미하므로 true
		hasnext = totalPage > endPage;
		// hasnext: endPage가 전체 페이지(totalPage)보다 작으면 다음 페이지가 있음을 의미하므로 true

		// 7. 사용을 위한 숫자형태의 배열 반환
		pageList = IntStream.rangeClosed(startPage, endPage).boxed().collect(Collectors.toList());
		// => IntStream : 기본자료형 int 형식의 연산에 최적화되어 있는 스트림 인터페이스
		// => rangeClosed() : start ~ end 까지 즉, 종료값 포함 return
		// => boxed() : 숫자(int) 스트림을 일반스트림(객체형) 으로 변환
		
		
		System.out.println("4. 페이지 시작 번호 설정:startPage : "+startPage);
		System.out.println("5. 페이지 끝번호 설정:endPage : "+endPage);
		System.out.println("pageList"+pageList);
	} // makePageList
}
