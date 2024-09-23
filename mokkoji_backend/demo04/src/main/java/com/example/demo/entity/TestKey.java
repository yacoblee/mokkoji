package com.example.demo.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//** MySql
//=> 복합키 설정 (장바구니 구현시 참고) 
/*
  create  table testkey (    
  id varchar(10),
  no int,
  name varchar(10),
  count int,
  CONSTRAINT pk_id PRIMARY KEY(id, no)
  );
  
  -> 반복 실행 Test 
  INSERT INTO testkey (id, no, name, count)
   VALUES ('banana', 1, '홍길동', 1)
   ON DUPLICATE KEY UPDATE count = count+5;
*/

//** JPA 복합키 생성 특징
//=> JPA는 복합키를 생성할때 컬럼명의 알파벳 순으로 생성.
//    Entity Class에 정의된 순서로 생성되지않음 주의
//=> 방법은 2가지
//  - @Embeddable : 좀더 객체지향적임
//  - @IdClass : DB방식에 가까움

//** JPA 복합키 생성 실습 (@IdClass 이용방법) 
//1) 테이블의 복합키를 담고 있는 식별자 클래스 TestkeyId 생성
//  - 식별자 클래스의 접근 지정자는 public
//  - Serializable 상속 - 직렬화 객체 
//  - 디폴트 생성자 필수(Lombok의 @NoArgsConstructor 사용)
//  - equals, hashCode 구현 (Lombok의 @Data 사용시 자동생성)
//  - 식별자 클래스의 변수명과 엔티티에서 사용되는 변수명이 동일

//2) Entity 클래스 설정
//  - Serializable (i) 구현
//  - @IdClass(TestkeyId.class) 로 식별자 클래스를 매핑
//  - 식별자클래스의 변수명과 엔티티의 변수명 동일
//  - key 컬럼에 @Id 지정 

//3) Repository 생성
//   - TestkeyRepository : Key_Type 에 주의 

//=> https://velog.io/@fj2008/JPA-복합키-작성기초

@Table(name="testkey")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(TestKeyId.class)
public class TestKey implements Serializable{
    private static final long serialVersionUID = 1L;
    
    // id + no 에 p.key 적용
	@Id 
    private String id;
    @Id
    private int no;
    @Column(length=1000, nullable = false)
    private String name;
    @Column(name= "count")
    private int count;
}
