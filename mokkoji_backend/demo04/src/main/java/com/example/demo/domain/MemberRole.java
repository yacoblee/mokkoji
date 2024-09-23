package com.example.demo.domain;

// ** Enum 클래스 (java.lang.Enum)
// => 열거형을 지원하는 다양한 메서드제공
//		values(), valueOf(), name(), ordinal() 등
//		ordinal() 은 열거형 상수가 정의된 순서를 정수로 반환 (0부터 시작)

public enum MemberRole {
	// => 관리하기가 순위 낮을수록 높은권한으로 하는것이 편리할듯.(?) 
	ADMIN, MANAGER, USER ;
}
