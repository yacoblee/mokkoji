package com.example.mokkoji_backend.pageTest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//** Criteria : (판단이나 결정을 위한) 기준
//=> 출력할 Row 를 select 하기 위한 클래스
//=> 이것을 위한 기준 값들을 관리

//** PageMaker : UI에 필요한 정보 완성

//** Paging 을 하려면 ... **
//=> 1Page에 출력할 Row 갯수 : 5개
//=> 현재 출력(요청) Page
//=> 출력할 List (Rows) 
//  -> start Row 순서번호 : 계산필요
//=> Criteria Class 에 정의 

//=> 1Page 출력 PagendRowNumber 갯수 : 10개
//  -> PageBlock 의 First Page No 
//  -> PageBlock 의 Last Page No
//  -> 전진, 후진 표시여부
//  -> go 전체의 First Page 표시여부
//  -> go 전체의 Last Page 표시여부
//=> PageMaker Class 로 처리 

@Getter
@ToString
public class Criteria {

	private int rowsPerPageCount;// 1 page에 출력할 Row 갯수
	private int currentPage; // 현재 출력(요청) 페이지
	private int startRowNumber; // 출력을 위한 Start Row 순서 번호 : 계산이 필요, 요청이 들어올때마다 변경
	private int endRowNumber; // 출력을 위한 End Row 순서 번호 : 계산 필요 (오라클만 필요)

	//서치 바 만들기
	@Setter
	private String searchType = "all";
	@Setter
	private String keyword ;
	@Setter
	private String[] check;
	
	// 1. 기본 생성자 : 기본값 초기화 필요
	public Criteria() {
		this.rowsPerPageCount = 5; // 5페이지 출력할꺼임!
		this.currentPage = 1; // 처음보여줄 페이지는 1 페이지야!
	}// Criteria
	

	
	

	// 2. 요청이 들어왔을 때 값을 갱신 (수정) 하는 메서드들
	public void setCurrentPage(int currentPage) {
		if (currentPage > 1)
			this.currentPage = currentPage; // 1보다 크면 입력한 페이지
		else
			this.currentPage = 1; // 아니면 1페이지
	}

	// 2.2) rowsPerPageCount(한 페이지에 보고 싶은 아이템 갯수!)
	// => 1페이지당 보여줄 Row(Record,튜플) 갯수 확인
	// => 제한조건 점검 ( 5~ 50개 까지만 허용)
	// => 당장은 사용하지 않지만 사용가능하도록 작성
	public void setRowsPerPageCount(int rowsPerPageCount) {
		if (rowsPerPageCount > 5 && rowsPerPageCount < 51)
			this.rowsPerPageCount = rowsPerPageCount;
		else {
			this.rowsPerPageCount = 5;
		}
	}

	// 2.3) setstartRowNumberendRowNumber : startRowNumber, endRowNumber 계산
	public void setStartRowNumberendRowNumber() {
		if (this.startRowNumber < 1)
			this.startRowNumber = 1; // 기본값 1
		this.startRowNumber = (this.currentPage - 1) * this.rowsPerPageCount;
		// => Mysql : Limit 5,5(6번째 부터 5개 출력해!=> 5개 건너띔)
		// => Oracle: between A And B/ between 6 And 10 (6번째 부터 10 번째까지)
		// this.startRowNumber = (this.currentPage-1)*this.rowsPerPageCount+1
		// this.endRowNumber = (this.startRowNumber+this.rowPerPage)-1;
	}

}// class