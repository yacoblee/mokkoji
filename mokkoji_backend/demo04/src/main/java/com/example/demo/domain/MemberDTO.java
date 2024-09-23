package com.example.demo.domain;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//** VO (Value Object)
//=> 특정 비즈니스 값을 담은 객체로 값을 표현하기 위한용도
//=> 불변객체 immutable object
//	 DTO와 유사하나 read only 속성을 가짐
//	 그러므로 setter 속성을 띄는 메소드 금지
//=> 특징: 데이터가 전송 과정 중에 변조되지 않음을 보장할 수 있다
//=> 다양한 로직 추가 가능

//** DTO (Data Transfer Object)
//=> 계층간 데이터 교환을 위한 객체
//=> 가변객체 mutable object
//	 로직을 포함하지않은 getter/setter 메소드만 가질수 있는 순수 Data 전달용
//=> View 와 통신하며 request, response 처리위해 값의 변경이 유동적 (View Layer)
//=> 네이밍: ~~DTO 

//** 결론 
//=> Spring MyBatis를 쓰는 경우에는 주로 VO라 표현하고 때로는 DTO라 표현하기도 하며
//	 Spring JPA를 쓰는 경우에는 Table과 일치하여 Table의 역할을 대신하는 경우 Entity 라고 표현한다.
//	 그리고 DTO와 VO는 위의 내용처럼 분명한 차이가 있다.

//---------------------------------------------

//** 추가적 분류
//=> 스프링 JPA를 사용하면 객체와 Table을 구체적으로 매핑하기 때문에
//	 Entity 로 구분함.

//** Entity
//=> 실제 DB 테이블과 매핑되는 클래스 (DB Layer)
//=> 가변객체 mutable object
//	 로직 포함 가능한 getter/setter 메소드를 가질수 있다
//=> 네이밍: 테이블명과 동일 

//** Domain
//=> 어플리케이션 내 로직들이 관여하는 정보와 활동의 영역,
//	 즉 해결하고자하는 업무 영역을 도메인(Domain) 이라한다.
//	 예를 들어 "온라인 서점" 도메인은 회원관리, 주문, 결제등의 하위도메인을 가진다.
//=> 이러한 도메인을 개념적으로 표현한것을 도메인 모델이라하고 이러한 분석과정을 통해
//	 도출된 결과물을 모델객체라 하며 이것은 Entity와 Value로 구분할 수 있다.
//=> 참고 Domain, Entity, Value(Object)
//	 https://doing7.tistory.com/79 

//=> 주로 Entity(Table) 관련 폴더명으로 사용됨  

//---------------------------------------------
//** ~DTO 정의
//=> 맴버변수 : private
//=> 외부에서는 setter/getter 로 접근
//=> 자료확인시 편리성을 위해 toString() 메서드 오버라이딩 
//---------------------------------------------

//** Lombok
//setter, getter, toString, 생성자 등을 자동으로 만들어줌
//컴파일 단계에서 애너테이션에 따라 여러가지 메소드나 코드를 자동적으로 추가해줌.

//=> 모든 필드의  public setter 와  getter 를 사용하는 일반적인 경우 유용하며, 
//=> 보안을 위해 setter 와  getter 의 접근 범위를 지정해야 하는 경우 등
//=> 대규모의 프로젝트에서 다양한 setter 와 getter code를 작성하는 경우에는 충분히 고려해야함. 

//=> @Data 즉, 다음 애너테이션을 모두 한번에 처리 한다.
//=> @Getter(모든 필드) : getter 생성하도록 지원
//=> @Setter(모든 필드-final로 선언되지 않은) : setter를 생성하도록 지원
//=> @ToString :  모든 필드를 출력하는 toString() 메소드 생성 

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDTO {
	// ** 맴버변수
	private String id;
	private String password;
	private String name;
	private int age;
	private int jno;
	private String info;
	private double point;
	private String birthday;
	private String rid;
	private String uploadfile; // Table 보관용(파일명)
	
	private MultipartFile uploadfilef; 
	// => form 으로부터 전달된 uploadFile 의 모든정보를 담기위한 컬럼
	
	// ** 생성자
	// ** getter/setter
	// ** toString
	
} //class
