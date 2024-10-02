package com.example.mokkoji_backend.pageTest;
//** PageMaker : View 에 필요한 값을 완성

import lombok.Getter;
import lombok.ToString;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

//=> Criteria 를 이용해서..

@Getter
@ToString
public class PageMaker {

	private int totalRowCount; // 출력 대상이 되는 전체 row 갯수 : from DB, DB에서 가져와야함
	private int displayPageCount = 3; // 한 페이지당 출력 할 페이지 번호 [< - - - >] 3개 출력
	private int startPageNumber; // view에 표시할 첫 PagendRowNumber [<💛 - - >]
	private int endPageNumber; // view에 표시할 끝 PagendRowNumber [< - - 💛>]
	// ※ 주의 필드명이 startPageNumber 처럼 두번째 알파벳이 대문자인 경우
	// => setter, getter 는 setstartPageNumber, setstartPageNumber ,
	// setstartPageNumber 형태로 만들어질수 있기 때문에
	// Lombok.. Spring 등등 API 들마다 규칙이 다르므로 오류 발생 가능성 높음
	// -> 그러므로 대.소문자 섞어사용시 주의.
	private int lastPageNumber; // 출력가능한 마지막 페이지
	private boolean hasPreviousPageBlock; // 이전 PageBlock 으로 [⏪ < - - - >]
	private boolean hasNextPageBlock; // 다음 PageBlock 으로 [< - - - > ⏩]

	// => pPageList, bChekList 등 요청처리명에 해당하는 url를 만들 수 있도록
	private String mappingName;

	Criteria cri;

	// ** 필요값 set & 계산
	// 1) Criteria 생성
	public void setCri(Criteria cri) { // Criteria가 upgrade 될거야 그래서 쉽게 변경하려고 이렇게 한거야...
		this.cri = cri;
	}

	public void setMappingName(String mappingName) {
		this.mappingName = mappingName;
	}

	// 2) totalRowCount
	// => 출력 대상이 되는 전체 row 갯수 : form DB
	// => 이 값을 이용해서 나머지 필요값 계산
	public void setTotalRowCount(int totalRowCount) {
		this.totalRowCount = totalRowCount;
		calcData();
	}

	// 3) 나머지 값 계산

	public void calcData() {

		// 3.1) startPageNumber, endPageNumber
		// => currentPage 번호가 속한 PabeBlock의 startPageNumber, endPageNumber 계산

		// => pagendRowNumber를 n개씩 출력한다고 가정하면 endPageNumber[< - - 💛>] 는 항상 n의 배수
		// displayPageCount=3 이면 3, 6, 9, 12,......
		// => ex) 17 page 요청 , displayPageCount=3, 일때 17이 몇번째 그룹 인지 계산하려면,
		// 17/3 -> 5 나머지 2 결론은 정수 나누기 후 나머지가 있으면 +1 이 필요함
		// -> Math.ceil(17/3) -> Math.ceil(5.73..) -> 6.0 -> 6번쨰 그룹 16,17,18
		// 즉, 17이 몇번째 그룹 인지 계산하고, 여기에 * displayPageCount 를 하면 됨.

		// ** Math.ceil(c) : 매개변수 c 보다 크면서 같은 가장 작은 정수를 double 형태로 반환
		// ceil -> 천장, 예) 11/3=3.666.. -> 4
		// => Math.ceil(12.345) => 13.0

		endPageNumber = (int) Math.ceil(cri.getCurrentPage() / (double) displayPageCount)
				* displayPageCount;
		//끝페이지번호 = (int) Math.ceil(기준.get현재페이지() / (double) 표시할페이지수) * 표시할페이지수;
		
		startPageNumber = (endPageNumber - displayPageCount) + 1;
		//시작페이지번호 = (끝페이지번호 - 표시할페이지수) + 1;
		
		// 3.2) lastPageNumber 계산, endPageNumber 적합성 확인
		lastPageNumber = (int) Math.ceil(totalRowCount / (double) cri.getRowsPerPageCount());
		if (endPageNumber > lastPageNumber)
			endPageNumber = lastPageNumber;

		// 3.3 ) pre, hasNextPageBlock
		hasPreviousPageBlock = startPageNumber == 1 ? false : true;
		hasNextPageBlock = endPageNumber == lastPageNumber ? false : true;
		
//	     ** 패키지 org.springframework.web.util
//	     => 웹개발에 필요한 많은 유틸리티 클래스 제공
//	     => UriComponents , UriComponentsBuilder
//	          Uri를 동적으로 생성해주는 클래스,
//	          파라미터가 조합된 uri를 손쉽게 만들어줌
//	     => ?currPage=7&rowsPerPage=10 이것을 만들어줌
//	          ? 부터 만들어지므로 jsp Code에서 ? 포함하지 않도록 주의  
		
		//url QueryString 자동생성
		//bPageList?currentPage=7&rowsPerPageCount=5
		//setMappingName을 사용할것.
	}
	
    // ** 패키지 org.springframework.web.util
    // => 웹개발에 필요한 많은 유틸리티 클래스 제공
    // => UriComponents , UriComponentsBuilder
    //      Uri를 동적으로 생성해주는 클래스,
    //      파라미터가 조합된 uri를 손쉽게 만들어줌
    // => ?currPage=7&rowsPerPage=10 이것을 만들어줌
    //      ? 부터 만들어지므로 jsp Code에서 ? 포함하지 않도록 주의
	public String makeQuery(int currentPage) {
		
		//버전 1
//		UriComponents uriComponents = UriComponentsBuilder.newInstance()
//				.queryParam("currentPage",currentPage)
//				.queryParam("rowsPerPageCount", cri.getRowsPerPageCount())
//				.build();
		
		//버전 2
//		UriComponents uriComponents = UriComponentsBuilder.newInstance()
//		.queryParam("currentPage",currentPage)
//		.queryParam("rowsPerPageCount", cri.getRowsPerPageCount())
//		.queryParam("searchType", cri.getSearchType())
//		.queryParam("keyword", cri.getKeyword())
//		.build();	
		
		//버전 3 checkBox Search
		MultiValueMap<String,String> checkMap = new LinkedMultiValueMap<String, String>();
		if(cri.getCheck()!=null && cri.getCheck().length>0) {
			for(String c : cri.getCheck()) {
				checkMap.add("check", c);
			}
		}else {
			//null을 명시
			checkMap = null;
		}
		UriComponents uriComponents = UriComponentsBuilder.newInstance()
				.queryParam("currentPage",currentPage)
				.queryParam("rowsPerPageCount", cri.getRowsPerPageCount())
				.queryParam("searchType", cri.getSearchType())
				.queryParam("keyword", cri.getKeyword())
				.queryParams(checkMap)
				.build();	
		return this.mappingName+uriComponents.toString();
	}
    // ** 배열Type check 처리 : Map 으로처리
    // => ?curPage=1&rowsPerPage=5&searchType=t&keyword=Java&check=admin&check=banana
    //    위의 쿼리스트링에서 check 부분은 몇개일지 모름
    // => UriComponents 에서 Multi Value 처리 :  queryParams(MultiValueMap<String, String> params) 
    
    // ** MultiValueMap
    // => 키의 중복이 허용됨 즉, 하나의 키에 여러 값을 받을 수 있음
    // => new LinkedMultiValueMap() 으로 생성, add("key","value")
    
    // ** Map (키중복 허용안됨) 과 비교 
    // => HashMap : 순서보장 안됨 
    // => TreeMap : key값 순서로 자동정렬
    // => LinkedHashMap : 입력순서보장
	
	

}
